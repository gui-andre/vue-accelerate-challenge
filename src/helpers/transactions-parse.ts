export function parseDate(date: string): string {
	const values = date.toString().split('-');
	return `${values[2]}/${values[1]}/${values[0]}`;
}

export function parseAmount(amount: number): string {
	return amount.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
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