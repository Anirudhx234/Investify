declare namespace AssetLists {
    export interface TopGainers {
        top_gainers: Stock[]
    }

    export interface TopLosers {
        top_losers: Stock[]
    }

    export interface MostActive {
        most_actively_traded: Stock[]
    }

    export interface Stock {
        ticker: string
        price: number
        change_amount: number
        change_percentage: string
        volume: number
    }
}

export default AssetLists