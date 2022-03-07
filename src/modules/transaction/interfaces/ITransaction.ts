export interface IState {
	id: string
	title: string
	description: string
	status: 'cancelled' | 'created' | 'processing' | 'processed';
	amount: number
	date: string
	from: string
}
