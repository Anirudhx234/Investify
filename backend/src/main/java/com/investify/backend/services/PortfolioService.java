package com.investify.backend.services;

import com.investify.backend.dtos.*;
import com.investify.backend.entities.*;
import com.investify.backend.enums.TradeType;
import com.investify.backend.exceptions.RestException;
import com.investify.backend.mappers.TradeMapper;
import com.investify.backend.repositories.*;
import com.investify.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;

    private final RealPortfolioRepository realPortfolioRepository;

    private final PaperPortfolioRepository paperPortfolioRepository;

    private final PortfolioAssetRepository portfolioAssetRepository;

    private final TradeRepository tradeRepository;

    private final TradeMapper tradeMapper;

    private final ClientService clientService;

    private final AssetService assetService;

    private final TwelveDataService twelveDataService;

    public RealPortfolio createRealPortfolio(String clientId, CreateRealPortfolioDto request) {
        Client client = clientService.findById(clientId);
        RealPortfolio portfolio = new RealPortfolio(client, request.getName());
        realPortfolioRepository.save(portfolio);
        return portfolio;
    }

    public PaperPortfolio createPaperPortfolio(String clientId, CreatePaperPortfolioDto request) {
        Client client = clientService.findById(clientId);

        if (request.getBuyingPower() < 0) {
            throw new RestException("Buying power must be positive", HttpStatus.BAD_REQUEST);
        }

        PaperPortfolio portfolio = new PaperPortfolio(client, request.getName(), request.getBuyingPower());
        paperPortfolioRepository.save(portfolio);
        return portfolio;
    }

    public Map<String, List<PortfolioListDto>> getAllPortfolios(String clientId) {
        Client client = clientService.findById(clientId);
        Optional<List<Portfolio>> portfolios = portfolioRepository.findByClientId(client.getId());

        List<Portfolio> allPortfolios = portfolios.orElse(Collections.emptyList());

        List<PortfolioListDto> realPortfolios = allPortfolios.stream()
                .filter(portfolio -> portfolio instanceof RealPortfolio)
                .map(portfolio -> new PortfolioListDto(
                        portfolio.getId(),
                        portfolio.getName()
                ))
                .toList();

        List<PortfolioListDto> paperPortfolios = allPortfolios.stream()
                .filter(portfolio -> portfolio instanceof PaperPortfolio && !(portfolio instanceof GamePortfolio))
                .map(portfolio -> new PortfolioListDto(
                        portfolio.getId(),
                        portfolio.getName()
                ))
                .toList();

        Map<String, List<PortfolioListDto>> response = new HashMap<>();
        response.put("realPortfolios", realPortfolios);
        response.put("paperPortfolios", paperPortfolios);

        return response;
    }

    public PortfolioResponse getPortfolio(UUID portfolioId) {
        Portfolio portfolio = findPortfolioById(portfolioId);

        if (portfolio instanceof RealPortfolio) {
            return getRealPortfolio((RealPortfolio) portfolio);
        } else if (portfolio instanceof PaperPortfolio) {
            return getPaperPortfolio((PaperPortfolio) portfolio);
        }
        throw new RestException("Unsupported portfolio type", HttpStatus.UNPROCESSABLE_ENTITY);
    }

    private RealPortfolioResponse getRealPortfolio(RealPortfolio portfolio) {
        List<PortfolioAssetResponse> portfolioAssets = portfolio.getPortfolioAssets()
                .stream()
                .map(asset -> {
                    double currentPrice = twelveDataService.getLivePrice(asset.getAsset().getSymbol());
                    double totalAssetValue = asset.getQuantity() * currentPrice;
                    return new PortfolioAssetResponse(
                            asset.getId(),
                            asset.getAsset(),
                            asset.getQuantity(),
                            asset.getAverageCost(),
                            currentPrice,
                            totalAssetValue
                    );
                })
                .collect(Collectors.toList());

        double totalPortfolioValue = portfolioAssets.stream()
                .mapToDouble(PortfolioAssetResponse::getTotalAssetValue)
                .sum();

        ROIDto info = getPortfolioROI(portfolio.getId());

        return new RealPortfolioResponse(portfolio.getName(), totalPortfolioValue, info.getRoi(), portfolioAssets);
    }

    private PaperPortfolioResponse getPaperPortfolio(PaperPortfolio portfolio) {
        List<TradeDto> trades = getTrades(portfolio.getId());

        double buyingPower = portfolio.getBuyingPower();

        if (portfolio instanceof GamePortfolio gamePortfolio && Utils.isPastGame(LocalDateTime.now(), gamePortfolio.getGame())) {
            return new PaperPortfolioResponse(portfolio.getName(), gamePortfolio.getTotalPortfolioValue(), buyingPower, gamePortfolio.getRoi(), trades);
        }
        else {
            ROIDto info = getPortfolioROI(portfolio.getId());
            
            List<PortfolioAssetResponse> portfolioAssets = portfolio.getPortfolioAssets()
                    .stream()
                    .map(asset -> {
                        double currentPrice = twelveDataService.getLivePrice(asset.getAsset().getSymbol());
                        double totalAssetValue = asset.getQuantity() * currentPrice;
                        return new PortfolioAssetResponse(
                                asset.getId(),
                                asset.getAsset(),
                                asset.getQuantity(),
                                asset.getAverageCost(),
                                currentPrice,
                                totalAssetValue
                        );
                    })
                    .toList();

            double totalPortfolioValue = portfolioAssets.stream()
                    .mapToDouble(PortfolioAssetResponse::getTotalAssetValue)
                    .sum();

            return new PaperPortfolioResponse(portfolio.getName(), totalPortfolioValue, buyingPower, info.getRoi(), portfolioAssets, trades);
        }
    }

    public Portfolio updatePortfolio(UUID portfolioId, UpdatePortfolioDto request) {
        Portfolio portfolio = findPortfolioById(portfolioId);
        portfolio.setName(request.getName());
        portfolioRepository.save(portfolio);
        return portfolio;
    }

    public void deletePortfolio(UUID portfolioId) {
        portfolioRepository.deleteById(portfolioId);
    }

    public PortfolioAsset addAssetToPortfolio(UUID realPortfolioId, AddPortfolioAssetRequest request) {
        RealPortfolio portfolio = findRealPortfolioById(realPortfolioId);

        Asset asset = assetService.findOrCreateAsset(request.getAsset());

        Optional<PortfolioAsset> existingAsset = portfolioAssetRepository.findByPortfolioAndAsset(portfolio, asset);
        if (existingAsset.isPresent()) {
            throw new RestException("Asset already exists in the portfolio", HttpStatus.CONFLICT);
        }

        PortfolioAsset portfolioAsset = new PortfolioAsset(portfolio, asset, request.getAverageCost(), request.getQuantity());
        portfolioAssetRepository.save(portfolioAsset);
        return portfolioAsset;
    }

    public PortfolioAsset updatePortfolioAsset(UUID realPortfolioId, UUID assetId, double averageCost, double quantity) {
        RealPortfolio portfolio = findRealPortfolioById(realPortfolioId);

        PortfolioAsset portfolioAsset = portfolioAssetRepository.findByPortfolioAndAssetId(portfolio, assetId)
                .orElseThrow(() -> new RestException("Asset not found in portfolio", HttpStatus.BAD_REQUEST));

        if (averageCost < 0) {
            throw new RestException("Average cost must be at least 0", HttpStatus.BAD_REQUEST);
        }
        if (quantity < 0) {
            throw new RestException("Quantity must be at least 0", HttpStatus.BAD_REQUEST);
        }

        portfolioAsset.setAverageCost(averageCost);
        portfolioAsset.setQuantity(quantity);
        portfolioAssetRepository.save(portfolioAsset);
        return portfolioAsset;
    }

    public PortfolioAsset deletePortfolioAsset(UUID realPortfolioId, UUID assetId) {
        RealPortfolio portfolio = findRealPortfolioById(realPortfolioId);

        PortfolioAsset portfolioAsset = portfolioAssetRepository.findByPortfolioAndAssetId(portfolio, assetId)
                .orElseThrow(() -> new RestException("Asset not found in portfolio", HttpStatus.BAD_REQUEST));

        portfolioAssetRepository.delete(portfolioAsset);
        return portfolioAsset;
    }

    public ROIDto getPortfolioROI(UUID portfolioId) {
        Portfolio portfolio = findPortfolioById(portfolioId);

        // Retrieve portfolio assets and calculate total current value and initial investment
        double totalGain = 0;
        double totalCost = 0;

        for (PortfolioAsset portfolioAsset : portfolio.getPortfolioAssets()) {
            ROIDto info = getPortfolioAssetROI(portfolioAsset);
            totalGain += info.getGain();
            totalCost += info.getCost();
        }

        double roi = (totalCost != 0) ? (totalGain - totalCost) / totalCost : 0;

        return new ROIDto(totalCost, totalGain, roi);
    }

    private ROIDto getPortfolioAssetROI(PortfolioAsset portfolioAsset) {
        double averageCost = portfolioAsset.getAverageCost();  // Assume initial price is stored
        double currentPrice = twelveDataService.getLivePrice(portfolioAsset.getAsset().getSymbol());
        double quantity = portfolioAsset.getQuantity();

        double totalCost = 0, totalGain = 0;
        if (portfolioAsset.getPortfolio() instanceof RealPortfolio) {
            totalCost = averageCost * quantity;
            totalGain = currentPrice * quantity;
        }
        else {
            List<TradeDto> trades = getTrades(portfolioAsset.getPortfolio().getId());

            for (TradeDto trade : trades) {
                if (trade.getAsset() != portfolioAsset.getAsset()) {
                    continue;
                }

                double totalValue = trade.getPrice() * trade.getQuantity();
                if (trade.getType() == TradeType.SELL) {
                    totalGain += totalValue;
                }
                else {
                    totalCost += totalValue;
                }
            }

            totalGain += currentPrice * quantity;
        }

        double roi = (totalCost != 0) ? (totalGain - totalCost) / totalCost : 0;

        return new ROIDto(totalCost, totalGain, roi);
    }

    private double scaleRisk(double riskScore, String riskPreference) {
        // Adjust overall risk score based on user preference
        switch (riskPreference) {
            case "LOW":
                riskScore /= 1;
                break;
            case "MEDIUM":
                riskScore /= 1.1;
                break;
            case "HIGH":
                riskScore /= 1.3;
                break;
            default:
                throw new IllegalArgumentException("Invalid risk preference");
        }
        return riskScore;
    }

    public RiskAssessmentResponse calculateRiskScoreWithAssets(UUID portfolioId) {
        Portfolio portfolio = findPortfolioById(portfolioId);

        // Risk multipliers for asset types
        double STOCK_MULTIPLIER = 3;
        double MUTUAL_FUND_MULTIPLIER = 2;
        double ETF_MULTIPLIER = 2;
        double CRYPTO_MULTIPLIER = 5;

        double overallRiskScore = 0;

        List<AssetRiskDetail> assetRiskDetails = new ArrayList<>();

        // Calculate total initial investment, current value, and individual asset risk contributions
        for (PortfolioAsset portfolioAsset : portfolio.getPortfolioAssets()) {
            if (portfolioAsset.getQuantity() == 0) {
                continue;
            }

            ROIDto info = getPortfolioAssetROI(portfolioAsset);
            double roi = Math.abs(info.getRoi());
            double assetRisk = 0;

            // Assign risk multiplier based on asset type and calculate weighted risk for each asset
            if (portfolioAsset.getAsset() instanceof Stock) {
                assetRisk = roi * STOCK_MULTIPLIER;
            } else if (portfolioAsset.getAsset() instanceof MutualFund) {
                assetRisk = roi * MUTUAL_FUND_MULTIPLIER;
            } else if (portfolioAsset.getAsset() instanceof ETF) {
                assetRisk = roi * ETF_MULTIPLIER;
            } else if (portfolioAsset.getAsset() instanceof Cryptocurrency) {
                assetRisk = roi * CRYPTO_MULTIPLIER;
            }

            // Accumulate total risk score
            overallRiskScore += assetRisk;

            // Add each asset's details to the list
            assetRiskDetails.add(new AssetRiskDetail(
                    portfolioAsset,
                    assetRisk
            ));
        }

        // Normalize overall risk score to be between 0 and 1
        overallRiskScore = Math.min(Math.max(overallRiskScore, 0), 1);

        overallRiskScore = scaleRisk(overallRiskScore, String.valueOf(portfolio.getClient().getInvestmentRisk()));

        // Sort assets by their individual risk scores in descending order
        assetRiskDetails.sort((a, b) -> Double.compare(b.getRiskScore(), a.getRiskScore()));

        // Create and return response
        return new RiskAssessmentResponse(overallRiskScore, assetRiskDetails);
    }

    public List<Map<String, Object>> calculateAverageROIAndRiskByAssetType(UUID portfolioId) {
        Portfolio portfolio = findPortfolioById(portfolioId);

        // Risk multipliers for each asset type
        double STOCK_MULTIPLIER = 3;
        double MUTUAL_FUND_MULTIPLIER = 2;
        double ETF_MULTIPLIER = 2;
        double CRYPTO_MULTIPLIER = 5;

        // Temporary variables to accumulate ROI and risk values for each type
        double stockROI = 0, stockRisk = 0, stockCount = 0;
        double mutualFundROI = 0, mutualFundRisk = 0, mutualFundCount = 0;
        double etfROI = 0, etfRisk = 0, etfCount = 0;
        double cryptoROI = 0, cryptoRisk = 0, cryptoCount = 0;

        // Loop through each asset and calculate ROI and risk
        for (PortfolioAsset portfolioAsset : portfolio.getPortfolioAssets()) {
            if (portfolioAsset.getQuantity() == 0) {
                continue;
            }

            Asset asset = portfolioAsset.getAsset();
            ROIDto info = getPortfolioAssetROI(portfolioAsset);
            double roi = info.getRoi();
            double returnPercentage = Math.abs(roi);
            double risk = 0;

            if (asset instanceof Stock) {
                risk = returnPercentage * STOCK_MULTIPLIER;
                stockROI += roi;
                stockRisk += risk;
                stockCount++;
            } else if (asset instanceof MutualFund) {
                risk = returnPercentage * MUTUAL_FUND_MULTIPLIER;
                mutualFundROI += roi;
                mutualFundRisk += risk;
                mutualFundCount++;
            } else if (asset instanceof ETF) {
                risk = returnPercentage * ETF_MULTIPLIER;
                etfROI += roi;
                etfRisk += risk;
                etfCount++;
            } else if (asset instanceof Cryptocurrency) {
                risk = returnPercentage * CRYPTO_MULTIPLIER;
                cryptoROI += roi;
                cryptoRisk += risk;
                cryptoCount++;
            }
        }

        String riskPreference = String.valueOf(portfolio.getClient().getInvestmentRisk());
        // Create the response list in the desired format
        List<Map<String, Object>> assetSummary = new ArrayList<>();

        assetSummary.add(Map.of(
                "name", "stocks",
                "risk", scaleRisk(calculateAverage(stockRisk, stockCount), riskPreference),
                "return", calculateAverage(stockROI, stockCount)
        ));
        assetSummary.add(Map.of(
                "name", "etfs",
                "risk", scaleRisk(calculateAverage(etfRisk, etfCount), riskPreference),
                "return", calculateAverage(etfROI, etfCount)
        ));
        assetSummary.add(Map.of(
                "name", "crypto",
                "risk", scaleRisk(calculateAverage(cryptoRisk, cryptoCount), riskPreference),
                "return", calculateAverage(cryptoROI, cryptoCount)
        ));
        assetSummary.add(Map.of(
                "name", "mutual_funds",
                "risk", scaleRisk(calculateAverage(mutualFundRisk, mutualFundCount), riskPreference),
                "return", calculateAverage(mutualFundROI, mutualFundCount)
        ));

        return assetSummary;
    }

    // Helper method to calculate the average safely
    double calculateAverage(double total, double count) {
        return count == 0 ? 0 : total / count;
    }

    public Map<String, Double> calculateSectorValuations(UUID portfolioId) {
        Portfolio portfolio = findPortfolioById(portfolioId);

        // Retrieve PortfolioAssets and collect as a List
        List<PortfolioAsset> assets = portfolioAssetRepository.findByPortfolio(portfolio)
                .stream()
                .toList();

        // Group by asset type and calculate valuations based on live price and quantity
        return assets.stream()
                .collect(Collectors.groupingBy(
                        asset -> asset.getAsset().getType(),
                        Collectors.summingDouble(asset -> {
                            double livePrice = twelveDataService.getLivePrice(asset.getAsset().getSymbol());
                            return livePrice * asset.getQuantity();
                        })
                ));
    }

    public double getTotalPortfolioValue(UUID portfolioId) {
        Portfolio portfolio = findPortfolioById(portfolioId);

        // Retrieve portfolio assets and calculate total value
        return portfolio.getPortfolioAssets()
                .stream()
                .mapToDouble(portfolioAsset -> {
                    double currentPrice = twelveDataService.getLivePrice(portfolioAsset.getAsset().getSymbol());
                    return portfolioAsset.getQuantity() * currentPrice;
                })
                .sum();
    }

    public List<TradeDto> getTrades(UUID paperPortfolioId) {
        PaperPortfolio portfolio = findPaperPortfolioById(paperPortfolioId);
        List<Trade> trades = portfolio.getTrades();

        trades.sort(Comparator.comparing(Trade::getTime, Comparator.nullsLast(Comparator.naturalOrder())).reversed());

        return trades.stream()
                .map(tradeMapper::toTradeDto)
                .toList();
    }

    public TradeDto createTrade(UUID paperPortfolioId, CreateTradeDto request) {
        PaperPortfolio portfolio = findPaperPortfolioById(paperPortfolioId);

        double totalPortfolioValue = getTotalPortfolioValue(paperPortfolioId);

        if (portfolio instanceof GamePortfolio) {
            LocalDateTime currentTime = LocalDateTime.now();
            Game game = ((GamePortfolio) portfolio).getGame();

            if (Utils.isUpcomingGame(currentTime, game)) {
                throw new RestException("Trades cannot be made for upcoming games", HttpStatus.FORBIDDEN);
            }

            if (Utils.isPastGame(currentTime, game)) {
                throw new RestException("Trades cannot be made for past games", HttpStatus.FORBIDDEN);
            }
        }

        Asset asset = assetService.findOrCreateAsset(request.getAsset());
        double currentPrice = twelveDataService.getLivePrice(asset.getSymbol());

        PortfolioAsset portfolioAsset;
        double buyingPower = portfolio.getBuyingPower();
        double totalValue = currentPrice * request.getQuantity();
        switch (request.getType()) {
            case SELL -> {
                portfolioAsset = findPortfolioAsset(portfolio, asset);
                if (portfolioAsset.getQuantity() < request.getQuantity()) {
                    throw new RestException("Insufficient shares for sell", HttpStatus.FORBIDDEN);
                }
                double quantity = portfolioAsset.getQuantity();
                double sellQuantity = request.getQuantity();
                double newQuantity = quantity - sellQuantity;
                double newAverageCost;
                if (newQuantity != 0) {
                    newAverageCost = (portfolioAsset.getAverageCost() * quantity - currentPrice * sellQuantity) / newQuantity;
                }
                else {
                    newAverageCost = 0;
                }

                totalPortfolioValue -= currentPrice * sellQuantity;

                portfolioAsset.setAverageCost(newAverageCost);
                portfolioAsset.setQuantity(newQuantity);
                portfolio.setBuyingPower(buyingPower + totalValue);
            }
            case BUY -> {
                if (buyingPower < totalValue) {
                    throw new RestException("Insufficient buying power", HttpStatus.FORBIDDEN);
                }
                portfolioAsset = findOrCreatePortfolioAsset(portfolio, asset);
                double quantity = portfolioAsset.getQuantity();
                double buyQuantity = request.getQuantity();
                double newQuantity = quantity + buyQuantity;
                double newAverageCost;
                if (newQuantity != 0) {
                    newAverageCost = (portfolioAsset.getAverageCost() * quantity + currentPrice * buyQuantity) / newQuantity;
                }
                else {
                    newAverageCost = 0;
                }

                totalPortfolioValue += currentPrice * buyQuantity;

                portfolioAsset.setAverageCost(newAverageCost);
                portfolioAsset.setQuantity(newQuantity);
                portfolio.setBuyingPower(buyingPower - totalValue);
            }
            default -> throw new RestException("Invalid order type", HttpStatus.BAD_REQUEST);
        }

        Trade trade = new Trade(portfolio, asset, request.getType(), currentPrice, request.getQuantity(), totalPortfolioValue);

        tradeRepository.save(trade);
        portfolioAssetRepository.save(portfolioAsset);
        paperPortfolioRepository.save(portfolio);

        return tradeMapper.toTradeDto(trade);
    }

    private Portfolio findPortfolioById(UUID portfolioId) {
        return portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new RestException("Unknown portfolio", HttpStatus.NOT_FOUND));
    }

    private RealPortfolio findRealPortfolioById(UUID realPortfolioId) {
        return realPortfolioRepository.findById(realPortfolioId)
                .orElseThrow(() -> new RestException("Unknown real portfolio", HttpStatus.NOT_FOUND));
    }

    private PaperPortfolio findPaperPortfolioById(UUID paperPortfolioId) {
        return paperPortfolioRepository.findById(paperPortfolioId)
                .orElseThrow(() -> new RestException("Unknown paper portfolio", HttpStatus.NOT_FOUND));
    }

    private PortfolioAsset findPortfolioAsset(Portfolio portfolio, Asset asset) {
        return portfolioAssetRepository.findByPortfolioAndAsset(portfolio, asset)
                .orElseThrow(() -> new RestException("Unknown portfolio asset", HttpStatus.NOT_FOUND));
    }

    private PortfolioAsset findOrCreatePortfolioAsset(Portfolio portfolio, Asset asset) {
        return portfolioAssetRepository.findByPortfolioAndAsset(portfolio, asset)
        .orElseGet(() -> {
            PortfolioAsset portfolioAsset = new PortfolioAsset(portfolio, asset);
            portfolioAssetRepository.save(portfolioAsset);
            return portfolioAsset;
        });
    }
}