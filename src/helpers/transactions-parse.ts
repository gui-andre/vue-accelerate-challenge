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

export function filterByArrayProperty(singleOptionArr: any[], objectArr: any[], objectParam: string, singleParam?: string) {
	const responseObj: any[] = [];
	singleOptionArr.forEach(opt => {
		objectArr.forEach(obj => {
			if (opt === obj[objectParam]) {
				if (singleParam) {
					responseObj.push(obj[singleParam]);
				} else {
					responseObj.push(obj);
				}
			}
		})
	});

	return responseObj;
}

export function filterObjectByText(fullList: any[], model: string, filteredList: any[]): IState[] {
	let response;
	if (shouldReturnFullList(model, filteredList)) {
		response = JSON.parse(JSON.stringify(fullList));
	} else {
		const filter = fullList?.filter(transaction => {
			const value = transaction.title.toUpperCase().includes(model.toUpperCase());
			return value;
		});
		response = filter ? filter : [];
	}

	return response;
}

export function filterObjectByStatus(selectedStatus: string[], list: any[]): IState[] {
	let response;
	if (!selectedStatus.length) {
		response = list;
	} else {
		response = filterByArrayProperty(
			selectedStatus,
			list,
			"status"
		);
	}

	return response;
}

function shouldReturnFullList(model: any, list: any[]): boolean {
	return !model || (list?.length === 0 && !model)
}