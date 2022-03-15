import { ISelectCheckboxOption } from '@/types/ISelectCheckboxOption';
import { IState } from '@/types/ITransaction';
import { parseDate, parseAmount, parseStatus, filterTransactionsByDescription, filterTransactionsByStatus, filterTransactions, getSelectedCheckboxText } from './transactions-parse';

const arr: string[] = ['created', 'cancelled'];

const filterOptions: ISelectCheckboxOption[] = [
	{
		text: "Cancelado",
		value: "cancelled",
		checked: false,
	},
	{
		text: "Concluído",
		value: "created",
		checked: false,
	},
];

const objArr: IState[] = [
	{
		id: '1',
		title: 'Resgate',
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

describe('transations-parse', () => {

	it('should call parseDate with date yyyy-mm-dd and format value to dd/mm/yyyy', () => {
		const response = parseDate('2022-02-14');
		expect(response).toBe('14/02/2022');
	});

	it('should call parseAmount and format value to BRL', () => {
		const response = parseAmount(10000);
		expect(response).toBe('R$\xa010.000,00');
	});

	it('should call parseStatus and return parsed status', () => {
		const response = parseStatus('created');
		expect(response).toBe('Concluído');
	});

	it('should call getSelectedCheckboxText and return filtered array', () => {
		const response = getSelectedCheckboxText(arr, filterOptions);
		expect(response).toEqual(['Cancelado', 'Concluído']);
	});

	it('should should call filterTransactionsByDescription and return full list', () => {
		const response = filterTransactionsByDescription(objArr, '', [objArr[1]]);
		expect(response).toEqual(objArr);
	});

	it('should should call filterTransactionsByDescription and return filtered list', () => {
		const response = filterTransactionsByDescription(objArr, 'resg', objArr);
		expect(response).toEqual([objArr[0]]);
	});

	it('should should call filterTransactionsByStatus and return full list', () => {
		const response = filterTransactionsByStatus([], objArr);
		expect(response).toEqual(objArr);
	});

	it('should should call filterTransactionsByStatus and return filtered list', () => {
		const response = filterTransactionsByStatus(['created'], objArr);
		expect(response).toEqual([objArr[1]]);
	});

	it('should call filterTransactions and return filtered list', () => {
		const response = filterTransactions(objArr, objArr, 'resg', ['processing']);
		expect(response).toEqual([objArr[0]]);
	});

	it('should call filterTransactions and return empty list', () => {
		const response = filterTransactions(objArr, objArr, 'resg', ['created']);
		expect(response).toEqual([]);
	});
})
