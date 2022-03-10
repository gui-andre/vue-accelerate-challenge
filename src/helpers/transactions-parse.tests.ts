import { IState } from '@/modules/transaction/interfaces/ITransaction';
import { parseDate, parseAmount, parseStatus, filterByArrayProperty, filterObjectByText, filterObjectByStatus, filterTransactionsList } from './transactions-parse';

const arr: string[] = ['created', 'cancelled'];

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

	it('should call filterByArrayProperty and return filtered array', () => {
		const response = filterByArrayProperty(arr, objArr, 'status');
		expect(response).toEqual([objArr[1]]);
	});

	it('should call filterByArrayProperty and return filtered property', () => {
		const response = filterByArrayProperty(arr, objArr, 'status', 'title');
		expect(response).toEqual(['Segundo']);
	});

	it('should should call filterObjectByText and return full list', () => {
		const response = filterObjectByText(objArr, '', [objArr[1]]);
		expect(response).toEqual(objArr);
	});

	it('should should call filterObjectByText and return filtered list', () => {
		const response = filterObjectByText(objArr, 'resg', objArr);
		expect(response).toEqual([objArr[0]]);
	});

	it('should should call filterObjectByStatus and return full list', () => {
		const response = filterObjectByStatus([], objArr);
		expect(response).toEqual(objArr);
	});

	it('should should call filterObjectByStatus and return filtered list', () => {
		const response = filterObjectByStatus(['created'], objArr);
		expect(response).toEqual([objArr[1]]);
	});

	it('should call filterTransactionsList and return filtered list', () => {
		const response = filterTransactionsList(objArr, objArr, 'resg', ['processing']);
		expect(response).toEqual([objArr[0]]);
	});

	it('should call filterTransactionsList and return empty list', () => {
		const response = filterTransactionsList(objArr, objArr, 'resg', ['created']);
		expect(response).toEqual([]);
	});
})
