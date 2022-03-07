<template>
	<div data-testid="transactions" class="transactions__wrapper">

		<DataTable class="transactions__table" :columns="columns" :load-data="getTransactions" showDivider />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DataTable } from '@warrenbrasil/nebraska-web'
import { TransactionsService } from '../services/index'
import { IState } from '../interfaces/ITransaction'
import SelectTransaction from '../components/SelectTransaction.vue'

import { parseDate, parseAmount, parseStatus } from '../../../helpers/transactions-parse';

const transactionsService = new TransactionsService();

@Component({
	components: {
		DataTable,
		SelectTransaction,
	},
})
export default class Transactions extends Vue {

	public transactions: IState[] | null = null;
	public selectedTransaction: IState | null = null;

	readonly columns = [
		{
			label: '',
			component: SelectTransaction,
			align: 'center'
		},
		{
			label: 'Data',
			getter: ({ date }: IState) => parseDate(date)
		},
		{
			label: 'Valor',
			getter: ({ amount }: IState) => parseAmount(amount)
		},
		{
			label: 'Descrição',
			getter: 'title'
		},
		{
			label: 'Situação',
			getter: ({ status }: IState) => ({
				tag: {
					text: parseStatus(status),
					error: status === 'cancelled',
					success: status === 'created',
					alert: status === 'processing',
					info: status === 'processed',
				}
			})
		},
	]

	async getTransactions() {
		try {
			return await transactionsService.getTransactions();
		} catch (error) {
			console.log({ error });
		}
	}
}
</script>

<style scoped>
	.transactions__wrapper {
		max-width: 70%;
		margin: 80px auto 0;
	}

	.transactions__table {
		border: 1px solid #ccc;
		border-radius: 8px;
	}
</style>
