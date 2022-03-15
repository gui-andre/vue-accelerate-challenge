<template>
  <div data-testid="transactions" class="transactions__wrapper">
    <div class="transactions__filter__wrapper">
      <Input
        class="transactions__filter__input"
        @model="filterByInput"
        :value="textFilterValue"
        left-icon-name="ic_search"
        :placeholder="'Busque pelo título'"
      />
      <SelectCheckbox
        class="transactions__filter__select"
        label="Filtre por status"
        :options="filterOptions"
        @selected-options="filterByStatus"
      />
    </div>

    <DataTable
      class="transactions__table"
      :columns="columns"
      :load-data="getTransactions"
      :data-params="{ transactions }"
      showDivider
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DataTable, Input } from "@warrenbrasil/nebraska-web";
import { TransactionsService } from "../services/index";
import { IState } from "../../../types/ITransaction";
import { ISelectCheckboxOption } from "../../../types/ISelectCheckboxOption";
import SelectTransaction from "../components/SelectTransaction.vue";
import SelectCheckbox from "../components/SelectCheckbox.vue";

import {
  parseDate,
  parseAmount,
  parseStatus,
  filterTransactions,
} from "../../../helpers/transactions-parse";

const transactionsService = new TransactionsService();

@Component({
  components: {
    DataTable,
    Input,
    SelectTransaction,
    SelectCheckbox,
  },
})
export default class Transactions extends Vue {
  private transactionsList: IState[] = [];
  public transactions: IState[] = [];
  public textFilterValue = "";
  public statusFilterValue: string[] = [];
  public readonly filterOptions: ISelectCheckboxOption[] = [
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
    {
      text: "Processando",
      value: "processing",
      checked: false,
    },
    {
      text: "Agendado",
      value: "processed",
      checked: false,
    },
  ];

  readonly columns = [
    {
      label: "",
      component: SelectTransaction,
      align: "center",
    },
    {
      label: "Data",
      getter: ({ date }: IState) => parseDate(date),
    },
    {
      label: "Valor",
      getter: ({ amount }: IState) => parseAmount(amount),
    },
    {
      label: "Descrição",
      getter: "title",
    },
    {
      label: "Situação",
      getter: ({ status }: IState) => ({
        tag: {
          text: parseStatus(status),
          error: status === "cancelled",
          success: status === "created",
          alert: status === "processing",
          info: status === "processed",
        },
      }),
    },
  ];

  private isLoading = true;

  async getTransactions(): Promise<IState[]> {
    try {
      if (this.isLoading) {
        this.transactionsList = await transactionsService.getTransactions();
        this.transactions = this.transactionsList;
        this.isLoading = false;
      }
      return this.transactions;
    } catch (error) {
      throw new Error("Ocurred an error on get data");
    }
  }

  public filterByInput(searchedDescription: string) {
    this.textFilterValue = searchedDescription;

		this.transactions = filterTransactions(
      this.transactionsList,
      this.transactions,
      this.textFilterValue,
      this.statusFilterValue
    );
  }

  public filterByStatus(selectedStatus: string[]) {
    this.statusFilterValue = selectedStatus;
    if (!this.transactionsList) return;

    this.transactions = filterTransactions(
      this.transactionsList,
      this.transactions,
      this.textFilterValue,
      this.statusFilterValue
    );
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

.transactions__filter__wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.transactions__filter__input {
  width: 55%;
}

.transactions__filter__select {
  max-width: 35%;
}
</style>
