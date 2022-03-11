import { ISelectCheckboxOption } from "@/types/ISelectCheckboxOption";
import { IState } from "@/types/ITransaction";
import { StatusOptions } from "@/types/status-types";

export function parseDate(date: string): string {
	const values = date.split('-');
	return `${values[2]}/${values[1]}/${values[0]}`;
}

export function parseAmount(amount: number): string {
	return amount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

export function parseStatus(status: StatusOptions): string {
	const parseOptions = {
		cancelled: 'Cancelado',
		created: 'Concluído',
		processing: 'Processando',
		processed: 'Agendado'
	};
	
	return parseOptions[status];
}

export function getSelectedCheckboxText(statusValueArr: string[], checkboxOptions: ISelectCheckboxOption[]): string[] {
	const response: string[] = []
	checkboxOptions.forEach(option => {
		if (statusValueArr.includes(option.value)) response.push(option.text);
	});

	return response;
}

export function filterTransactions(allTransactions: IState[], filteredTransactions: IState[], textFilter: string, statusFilter: string[]): IState[] {
	const textFilteredTransactions = filterTransactionsByDescription(allTransactions, textFilter, filteredTransactions);
	const statusFilterTransactions = filterTransactionsByStatus(statusFilter, textFilteredTransactions);
	return statusFilterTransactions;
}

export function filterTransactionsByDescription(fullList: IState[], searchedDescription: string, filteredList: IState[]): IState[] {
	let response;
	if (shouldReturnAllTransactions(searchedDescription, filteredList)) {
		response = fullList;
	} else {
		const filter = fullList?.filter(transaction => transaction.title.toUpperCase().includes(searchedDescription.toUpperCase()));
		response = filter ? filter : [];
	}

	return response;
}

export function filterTransactionsByStatus(selectedStatus: string[], transactionsList: IState[]): IState[] {
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

function shouldReturnAllTransactions(searchedDescription: string, transactions: IState[]): boolean {
	return !searchedDescription || (transactions?.length === 0 && !searchedDescription)
}