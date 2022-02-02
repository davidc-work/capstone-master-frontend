export interface Transaction {
        id: number,
        type: string,
        itemDescription: string,
        quantity?: any,
        pricePerUnit?: any,
        amount: any,
        sold?: boolean,
        quantityAvailable?: any,
        fund_id?: any,
        createdAt: string,
        updatedAt: string,
        CustomerId: number
}