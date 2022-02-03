export interface Fund {
        id?: number,
        name?: string,
        ticker?: string,
        assetClass?: string,
        expenseRatio?: string,
        price?: string,
        priceChange?: string,
        ytd?: string,
        oneyr?: string,
        fiveyr?: string,
        tenyr?: string,
        sinceInception?: string,
        stocks?: any,
        inSearch?: boolean,
        priceChangePercent?: string,
        positiveChange?: boolean
}