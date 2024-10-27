import { Redirect, Route, Switch } from "wouter";
import SearchBar from "../scenes/SearchBar";
import AssetPage from "./AssetPage";
import {StocksList} from "../components/StocksList.tsx";
import AssetLists from "../types/AssetLists";
import TopGainers = AssetLists.TopGainers;
import MostActive = AssetLists.MostActive;
import TopLosers = AssetLists.TopLosers;

export default function AssetsPage() {
  return (
    <Switch>
      <Route path="/" component={SearchPage} />
      <Route path="/:type/:symbol" component={AssetPage} />
      <Route path="*" component={() => <Redirect to="/" />} />
    </Switch>
  );
}

function SearchPage() {
    const JSONData = "{\n" +
        "           \"metadata\": \"Top gainers, losers, and most actively traded US tickers\",\n" +
        "           \"last_updated\": \"2024-10-04 16:15:59 US/Eastern\",\n" +
        "           \"top_gainers\": [\n" +
        "               {\n" +
        "                   \"ticker\": \"CHSN\",\n" +
        "                   \"price\": \"14.81\",\n" +
        "                   \"change_amount\": \"11.77\",\n" +
        "                   \"change_percentage\": \"387.1711%\",\n" +
        "                   \"volume\": \"10785268\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"PEV\",\n" +
        "                   \"price\": \"1.07\",\n" +
        "                   \"change_amount\": \"0.7225\",\n" +
        "                   \"change_percentage\": \"207.9137%\",\n" +
        "                   \"volume\": \"226519966\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"IVDAW\",\n" +
        "                   \"price\": \"0.03\",\n" +
        "                   \"change_amount\": \"0.0183\",\n" +
        "                   \"change_percentage\": \"156.4103%\",\n" +
        "                   \"volume\": \"33419\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"SWAGW\",\n" +
        "                   \"price\": \"0.0244\",\n" +
        "                   \"change_amount\": \"0.0137\",\n" +
        "                   \"change_percentage\": \"128.0374%\",\n" +
        "                   \"volume\": \"2671\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"KACLW\",\n" +
        "                   \"price\": \"0.0285\",\n" +
        "                   \"change_amount\": \"0.0158\",\n" +
        "                   \"change_percentage\": \"124.4094%\",\n" +
        "                   \"volume\": \"1792\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"FGIWW\",\n" +
        "                   \"price\": \"0.13\",\n" +
        "                   \"change_amount\": \"0.0694\",\n" +
        "                   \"change_percentage\": \"114.5215%\",\n" +
        "                   \"volume\": \"4335\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"MOBXW\",\n" +
        "                   \"price\": \"0.1758\",\n" +
        "                   \"change_amount\": \"0.0758\",\n" +
        "                   \"change_percentage\": \"75.8%\",\n" +
        "                   \"volume\": \"4269\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"ENTO\",\n" +
        "                   \"price\": \"0.5997\",\n" +
        "                   \"change_amount\": \"0.2537\",\n" +
        "                   \"change_percentage\": \"73.3237%\",\n" +
        "                   \"volume\": \"9515734\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"NKGNW\",\n" +
        "                   \"price\": \"0.06\",\n" +
        "                   \"change_amount\": \"0.025\",\n" +
        "                   \"change_percentage\": \"71.4286%\",\n" +
        "                   \"volume\": \"86424\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"IROHW\",\n" +
        "                   \"price\": \"0.0533\",\n" +
        "                   \"change_amount\": \"0.021\",\n" +
        "                   \"change_percentage\": \"65.0155%\",\n" +
        "                   \"volume\": \"1500\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"BIAFW\",\n" +
        "                   \"price\": \"2.0\",\n" +
        "                   \"change_amount\": \"0.75\",\n" +
        "                   \"change_percentage\": \"60.0%\",\n" +
        "                   \"volume\": \"7819\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"BENF\",\n" +
        "                   \"price\": \"1.89\",\n" +
        "                   \"change_amount\": \"0.7\",\n" +
        "                   \"change_percentage\": \"58.8235%\",\n" +
        "                   \"volume\": \"107433435\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"FORD\",\n" +
        "                   \"price\": \"5.38\",\n" +
        "                   \"change_amount\": \"1.85\",\n" +
        "                   \"change_percentage\": \"52.4079%\",\n" +
        "                   \"volume\": \"18363968\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"AUUDW\",\n" +
        "                   \"price\": \"0.047\",\n" +
        "                   \"change_amount\": \"0.016\",\n" +
        "                   \"change_percentage\": \"51.6129%\",\n" +
        "                   \"volume\": \"465\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"LSBPW\",\n" +
        "                   \"price\": \"0.074\",\n" +
        "                   \"change_amount\": \"0.0246\",\n" +
        "                   \"change_percentage\": \"49.7976%\",\n" +
        "                   \"volume\": \"4650\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"FORLW\",\n" +
        "                   \"price\": \"0.08\",\n" +
        "                   \"change_amount\": \"0.0265\",\n" +
        "                   \"change_percentage\": \"49.5327%\",\n" +
        "                   \"volume\": \"7550\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"MTEKW\",\n" +
        "                   \"price\": \"0.135\",\n" +
        "                   \"change_amount\": \"0.0432\",\n" +
        "                   \"change_percentage\": \"47.0588%\",\n" +
        "                   \"volume\": \"1000\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"EVEX+\",\n" +
        "                   \"price\": \"0.1288\",\n" +
        "                   \"change_amount\": \"0.0388\",\n" +
        "                   \"change_percentage\": \"43.1111%\",\n" +
        "                   \"volume\": \"11311\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"EUDAW\",\n" +
        "                   \"price\": \"0.0996\",\n" +
        "                   \"change_amount\": \"0.0296\",\n" +
        "                   \"change_percentage\": \"42.2857%\",\n" +
        "                   \"volume\": \"1331\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"CUE\",\n" +
        "                   \"price\": \"1.16\",\n" +
        "                   \"change_amount\": \"0.3408\",\n" +
        "                   \"change_percentage\": \"41.6016%\",\n" +
        "                   \"volume\": \"5985953\"\n" +
        "               }\n" +
        "           ],\n" +
        "           \"top_losers\": [\n" +
        "               {\n" +
        "                   \"ticker\": \"PAVMZ\",\n" +
        "                   \"price\": \"0.0121\",\n" +
        "                   \"change_amount\": \"-0.0279\",\n" +
        "                   \"change_percentage\": \"-69.75%\",\n" +
        "                   \"volume\": \"2381\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"GUT^\",\n" +
        "                   \"price\": \"0.0054\",\n" +
        "                   \"change_amount\": \"-0.0094\",\n" +
        "                   \"change_percentage\": \"-63.5135%\",\n" +
        "                   \"volume\": \"713308\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"SEDA+\",\n" +
        "                   \"price\": \"0.03\",\n" +
        "                   \"change_amount\": \"-0.0503\",\n" +
        "                   \"change_percentage\": \"-62.6401%\",\n" +
        "                   \"volume\": \"27196\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"BCSAW\",\n" +
        "                   \"price\": \"0.004\",\n" +
        "                   \"change_amount\": \"-0.0054\",\n" +
        "                   \"change_percentage\": \"-57.4468%\",\n" +
        "                   \"volume\": \"45336\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"BSLKW\",\n" +
        "                   \"price\": \"0.027\",\n" +
        "                   \"change_amount\": \"-0.033\",\n" +
        "                   \"change_percentage\": \"-55.0%\",\n" +
        "                   \"volume\": \"200\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"COOTW\",\n" +
        "                   \"price\": \"0.0122\",\n" +
        "                   \"change_amount\": \"-0.0114\",\n" +
        "                   \"change_percentage\": \"-48.3051%\",\n" +
        "                   \"volume\": \"12310\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"PNST+\",\n" +
        "                   \"price\": \"0.0103\",\n" +
        "                   \"change_amount\": \"-0.0096\",\n" +
        "                   \"change_percentage\": \"-48.2412%\",\n" +
        "                   \"volume\": \"59913\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"WLDSW\",\n" +
        "                   \"price\": \"0.0099\",\n" +
        "                   \"change_amount\": \"-0.0083\",\n" +
        "                   \"change_percentage\": \"-45.6044%\",\n" +
        "                   \"volume\": \"7202\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"SATLW\",\n" +
        "                   \"price\": \"0.0522\",\n" +
        "                   \"change_amount\": \"-0.0378\",\n" +
        "                   \"change_percentage\": \"-42.0%\",\n" +
        "                   \"volume\": \"6330\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"ADD\",\n" +
        "                   \"price\": \"0.2671\",\n" +
        "                   \"change_amount\": \"-0.1829\",\n" +
        "                   \"change_percentage\": \"-40.6444%\",\n" +
        "                   \"volume\": \"14605453\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"RMCOW\",\n" +
        "                   \"price\": \"0.012\",\n" +
        "                   \"change_amount\": \"-0.008\",\n" +
        "                   \"change_percentage\": \"-40.0%\",\n" +
        "                   \"volume\": \"3400\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"BCTXW\",\n" +
        "                   \"price\": \"0.2503\",\n" +
        "                   \"change_amount\": \"-0.1581\",\n" +
        "                   \"change_percentage\": \"-38.712%\",\n" +
        "                   \"volume\": \"9508\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"CRGOW\",\n" +
        "                   \"price\": \"0.0619\",\n" +
        "                   \"change_amount\": \"-0.0377\",\n" +
        "                   \"change_percentage\": \"-37.8514%\",\n" +
        "                   \"volume\": \"7766\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"CMAXW\",\n" +
        "                   \"price\": \"0.0061\",\n" +
        "                   \"change_amount\": \"-0.0035\",\n" +
        "                   \"change_percentage\": \"-36.4583%\",\n" +
        "                   \"volume\": \"1221\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"HPAIW\",\n" +
        "                   \"price\": \"0.07\",\n" +
        "                   \"change_amount\": \"-0.04\",\n" +
        "                   \"change_percentage\": \"-36.3636%\",\n" +
        "                   \"volume\": \"1\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"ABVEW\",\n" +
        "                   \"price\": \"0.016\",\n" +
        "                   \"change_amount\": \"-0.0085\",\n" +
        "                   \"change_percentage\": \"-34.6939%\",\n" +
        "                   \"volume\": \"13182\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"SONDW\",\n" +
        "                   \"price\": \"0.0085\",\n" +
        "                   \"change_amount\": \"-0.0045\",\n" +
        "                   \"change_percentage\": \"-34.6154%\",\n" +
        "                   \"volume\": \"22089\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"RELIW\",\n" +
        "                   \"price\": \"0.046\",\n" +
        "                   \"change_amount\": \"-0.024\",\n" +
        "                   \"change_percentage\": \"-34.2857%\",\n" +
        "                   \"volume\": \"2500\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"DUO\",\n" +
        "                   \"price\": \"2.53\",\n" +
        "                   \"change_amount\": \"-1.24\",\n" +
        "                   \"change_percentage\": \"-32.8912%\",\n" +
        "                   \"volume\": \"27282517\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"DUETW\",\n" +
        "                   \"price\": \"0.0202\",\n" +
        "                   \"change_amount\": \"-0.0097\",\n" +
        "                   \"change_percentage\": \"-32.4415%\",\n" +
        "                   \"volume\": \"198\"\n" +
        "               }\n" +
        "           ],\n" +
        "           \"most_actively_traded\": [\n" +
        "               {\n" +
        "                   \"ticker\": \"NVDA\",\n" +
        "                   \"price\": \"124.92\",\n" +
        "                   \"change_amount\": \"2.07\",\n" +
        "                   \"change_percentage\": \"1.685%\",\n" +
        "                   \"volume\": \"242116831\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"PEV\",\n" +
        "                   \"price\": \"1.07\",\n" +
        "                   \"change_amount\": \"0.7225\",\n" +
        "                   \"change_percentage\": \"207.9137%\",\n" +
        "                   \"volume\": \"226519966\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"SQQQ\",\n" +
        "                   \"price\": \"7.43\",\n" +
        "                   \"change_amount\": \"-0.28\",\n" +
        "                   \"change_percentage\": \"-3.6316%\",\n" +
        "                   \"volume\": \"182063268\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"NCNC\",\n" +
        "                   \"price\": \"0.1426\",\n" +
        "                   \"change_amount\": \"0.01\",\n" +
        "                   \"change_percentage\": \"7.5415%\",\n" +
        "                   \"volume\": \"145082725\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"BENF\",\n" +
        "                   \"price\": \"1.89\",\n" +
        "                   \"change_amount\": \"0.7\",\n" +
        "                   \"change_percentage\": \"58.8235%\",\n" +
        "                   \"volume\": \"107433435\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"SOXL\",\n" +
        "                   \"price\": \"36.71\",\n" +
        "                   \"change_amount\": \"1.5\",\n" +
        "                   \"change_percentage\": \"4.2602%\",\n" +
        "                   \"volume\": \"100089079\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"FXI\",\n" +
        "                   \"price\": \"35.76\",\n" +
        "                   \"change_amount\": \"1.26\",\n" +
        "                   \"change_percentage\": \"3.6522%\",\n" +
        "                   \"volume\": \"98881024\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"TELL\",\n" +
        "                   \"price\": \"0.976\",\n" +
        "                   \"change_amount\": \"0.0059\",\n" +
        "                   \"change_percentage\": \"0.6082%\",\n" +
        "                   \"volume\": \"92322390\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"NIO\",\n" +
        "                   \"price\": \"6.775\",\n" +
        "                   \"change_amount\": \"0.075\",\n" +
        "                   \"change_percentage\": \"1.1194%\",\n" +
        "                   \"volume\": \"91060269\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"TSLA\",\n" +
        "                   \"price\": \"250.08\",\n" +
        "                   \"change_amount\": \"9.42\",\n" +
        "                   \"change_percentage\": \"3.9142%\",\n" +
        "                   \"volume\": \"86154388\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"YANG\",\n" +
        "                   \"price\": \"2.76\",\n" +
        "                   \"change_amount\": \"-0.3\",\n" +
        "                   \"change_percentage\": \"-9.8039%\",\n" +
        "                   \"volume\": \"78281990\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"RIVN\",\n" +
        "                   \"price\": \"10.44\",\n" +
        "                   \"change_amount\": \"-0.34\",\n" +
        "                   \"change_percentage\": \"-3.154%\",\n" +
        "                   \"volume\": \"76278696\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"TIGR\",\n" +
        "                   \"price\": \"12.39\",\n" +
        "                   \"change_amount\": \"3.2\",\n" +
        "                   \"change_percentage\": \"34.8205%\",\n" +
        "                   \"volume\": \"76094685\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"TSLL\",\n" +
        "                   \"price\": \"12.54\",\n" +
        "                   \"change_amount\": \"0.87\",\n" +
        "                   \"change_percentage\": \"7.455%\",\n" +
        "                   \"volume\": \"68134096\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"SOXS\",\n" +
        "                   \"price\": \"20.02\",\n" +
        "                   \"change_amount\": \"-0.85\",\n" +
        "                   \"change_percentage\": \"-4.0728%\",\n" +
        "                   \"volume\": \"65138258\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"PLTR\",\n" +
        "                   \"price\": \"40.01\",\n" +
        "                   \"change_amount\": \"0.77\",\n" +
        "                   \"change_percentage\": \"1.9623%\",\n" +
        "                   \"volume\": \"62325318\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"EVGO\",\n" +
        "                   \"price\": \"7.2\",\n" +
        "                   \"change_amount\": \"0.88\",\n" +
        "                   \"change_percentage\": \"13.9241%\",\n" +
        "                   \"volume\": \"61346770\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"SOFI\",\n" +
        "                   \"price\": \"8.39\",\n" +
        "                   \"change_amount\": \"0.56\",\n" +
        "                   \"change_percentage\": \"7.152%\",\n" +
        "                   \"volume\": \"57743292\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"TLT\",\n" +
        "                   \"price\": \"95.55\",\n" +
        "                   \"change_amount\": \"-1.19\",\n" +
        "                   \"change_percentage\": \"-1.2301%\",\n" +
        "                   \"volume\": \"55563835\"\n" +
        "               },\n" +
        "               {\n" +
        "                   \"ticker\": \"TQQQ\",\n" +
        "                   \"price\": \"71.97\",\n" +
        "                   \"change_amount\": \"2.45\",\n" +
        "                   \"change_percentage\": \"3.5242%\",\n" +
        "                   \"volume\": \"55021056\"\n" +
        "               }\n" +
        "           ]\n" +
        "        }"

    const top_gainers = JSON.parse(JSONData) as TopGainers;
    const top_losers = JSON.parse(JSONData) as TopLosers;
    const popular_stocks = JSON.parse(JSONData) as MostActive

  return (
    <div className="mt-12 flex w-full flex-col items-center gap-12">
      <SearchBar />
        <StocksList stocks={top_gainers.top_gainers}/>
        <StocksList stocks={top_losers.top_losers}/>
        <StocksList stocks={popular_stocks.most_actively_traded}/>
    </div>
  );
}
