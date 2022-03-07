import { parseDate, parseAmount, parseStatus } from './transactions-parse';

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
})
