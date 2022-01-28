export interface UserPortfolio  {
  customer_id?: number,
  id?: number,
  createdAt?: string,
  ClientProfile?: {
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    birthdate?: string,
    age?: string,
    ClientId?: number
  },
  ClientPortfolios?: [{
    id?: number,
    fundKey?: number,
    quantity?: number,
    createdAt?: string,
    updatedAt?: string,
    ClientId?: number
  }]
}



