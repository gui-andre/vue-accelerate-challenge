import { Api } from '@/services/api';
import { IState } from '../interfaces/ITransaction'

export class TransactionsService extends Api {
	constructor() {
		super()
	}
	
	public getTransactions() : Promise<IState[]> {
		return this.get('https://warren-transactions-api.herokuapp.com/api/transactions');
	}

}