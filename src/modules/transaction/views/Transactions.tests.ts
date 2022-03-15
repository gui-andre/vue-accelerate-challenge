const mockApiResponse: IState[] = [
	{
		id: '1',
		title: 'Primeiro',
		description: 'Mock Description',
		status: 'processing',
		amount: 10000,
		date: '2022/02/14',
		from: 'Mock From',
	},
	{
		id: '2',
		title: 'Segundo',
		description: 'Mock Description',
		status: 'created',
		amount: 15000,
		date: '2022/02/17',
		from: 'Mock From',
	}
]

import Transactions from './Transactions.vue';
import { render } from '@testing-library/vue';
import { TransactionsService } from '../services/index';
import { screen } from "@testing-library/dom";
import { IState } from '../interfaces/ITransaction';

const getTransactionsSpy = jest.spyOn(TransactionsService.prototype, 'getTransactions');

describe('<Transactions />', () => {

	beforeEach(() => {
    jest.clearAllMocks()
  });

	test('should render component', () => {
		const { getByTestId } = render(Transactions);

		const transactions = getByTestId('transactions');

		expect(transactions).toBeInTheDocument();
	});

	it('should display element inside table', async () => {
		getTransactionsSpy.mockResolvedValue(mockApiResponse);
		
		const { findAllByTestId } = render(Transactions);

		const item = await findAllByTestId('select-transaction');
		
		expect(item).toHaveLength(2);
  });

	it('should not display element inside table when API call fails', async () => {
		getTransactionsSpy.mockRejectedValue({ error: 'erro' });
		
		render(Transactions);

		const item = await screen.findByText('Nenhum dado pode ser mostrado');
		
		expect(item).toBeTruthy();
  });

});
