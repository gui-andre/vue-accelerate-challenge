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

const makeWrapper = () => render(Transactions);

describe('<Transactions />', () => {

	beforeEach(() => {
    jest.clearAllMocks()
  });

	test('should render component', () => {
		const wrapper = makeWrapper();

		const transactions = wrapper.getByTestId('transactions');

		expect(transactions).toBeInTheDocument();
	});

	it('should display element inside table', async () => {
		jest.spyOn(TransactionsService.prototype, 'getTransactions')
			.mockResolvedValue(mockApiResponse);
		
		const wrapper = makeWrapper();

		const item = await wrapper.findAllByTestId('select-transaction');
		
		expect(item.length).toBe(2);
  });

	it('should not display element inside table when API call fails', async () => {
		jest.spyOn(TransactionsService.prototype, 'getTransactions')
			.mockRejectedValue({ error: 'erro' });
		
		const wrapper = makeWrapper();

		const item = await screen.findByText('Não há conteúdo para ser mostrado');
		
		expect(item).toBeTruthy();
  });

});
