import { ISelectCheckboxOption } from "@/modules/transaction/interfaces/ISelectCheckboxOption";
import { IState } from "@/modules/transaction/interfaces/ITransaction";

export function parseDate(date: string): string {
	const values = date.split('-');
	return `${values[2]}/${values[1]}/${values[0]}`;
}

export function parseAmount(amount: number): string {
	return amount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

export function parseStatus(status: string): string {
	let parsedStatus = '';
	switch (status) {
		case 'cancelled':
			parsedStatus = 'Cancelado';
			break;
		case 'created':
			parsedStatus = 'Concluído';
			break;
		case 'processing':
			parsedStatus = 'Processando';
			break;
		case 'processed':
			parsedStatus = 'Agendado';
			break;
		default:
			break;
	}

	return parsedStatus;
}

export function getSelectedCheckboxText(statusValueArr: string[], checkboxOptions: ISelectCheckboxOption[]): string[] {
	const response: string[] = []
	checkboxOptions.forEach(option => {
		if (statusValueArr.includes(option.value)) response.push(option.text);
	});
	
	return response;
}

export function filterTransactionsList(fullList: IState[], filteredList: IState[], textFilter: string, statusFilter: string[]): IState[] {
	const textFilteredList = filterObjectByText(fullList, textFilter, filteredList);
	const statusFilterList = filterObjectByStatus(statusFilter, textFilteredList);
	return statusFilterList;
}

export function filterObjectByText(fullList: IState[], model: string, filteredList: IState[]): IState[] {
	let response;
	if (shouldReturnFullList(model, filteredList)) {
		response = fullList;
	} else {
		const filter = fullList?.filter(transaction => transaction.title.toUpperCase().includes(model.toUpperCase()));
		response = filter ? filter : [];
	}

	return response;
}

export function filterObjectByStatus(selectedStatus: string[], transactionsList: IState[]): IState[] {
	let response: IState[] = [];

	if (!selectedStatus.length) {
		response = transactionsList;
	} else {
		transactionsList.forEach(transaction => {
			if (selectedStatus.includes(transaction.status)) response.push(transaction);
		});
	}
	return response;
}

function shouldReturnFullList(model: string, list: IState[]): boolean {
	return !model || (list?.length === 0 && !model)
}