<template>
	<div data-testid="select-checkbox" class="select-checkbox__wrapper" :class="{'select-checkbox__oppened': showOptions}">
		<span class="select-checkbox__itens" @click="toggleOptions()">
			<BaseIcon class="select-checkbox__icon" icon="ic_filter_list" colors="var(--element-primary)"/>
			<div v-if="selectedValues.length" class="select-checkbox__label">{{ selectedTexts.join(', ') }}</div>
			<div v-else class="select-checkbox__label">{{ label }}</div>
		</span>
		<div data-testid="select-checkbox-itens" v-if="showOptions" class="select-checkbox__list__wrapper">
			<Checkbox v-for="option in filterOptions" :key="option.value" :value="option.value" v-model="selectedValues">{{ option.text }}</Checkbox>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Emit, Watch } from 'vue-property-decorator';
import { BaseIcon, Checkbox } from '@warrenbrasil/nebraska-web';
import { ISelectCheckboxOption } from '../interfaces/ISelectCheckboxOption';
import { filterByArrayProperty } from '../../../helpers/transactions-parse';

@Component({
	components: {
		BaseIcon,
		Checkbox,
	}
})
export default class SelectCheckbox extends Vue {
	@Prop({ required: true, type: String, default: 'Selecione as opções' })
	public label?: string;

	@PropSync('options', { required: true, type: Array })
	public filterOptions!: ISelectCheckboxOption[];

	public showOptions = false;
	public selectedValues: string[] = [];
	public selectedTexts: string[] = [];

	public toggleOptions() {
		this.showOptions = !this.showOptions;
	}

	@Watch('selectedValues')
	private emitSelectedOptions(val: string[], oldVal: string[]) {
		this.selectedTexts = filterByArrayProperty(val, this.filterOptions, 'value', 'text')
		this.selectedOptions(val);
	}

	@Emit()
  private selectedOptions(emitVal: string[]) {
    return emitVal;
  }

}
</script>

<style scoped>

	.select-checkbox__wrapper {
		position: relative;
		height: 60px;
		width: 100%;
		background-color: var(--light-background-primary);
		border-radius: 8px;
		display: flex;
		align-items: center;
		font-family: 'Warren Text';
		font-size: 14px;
		color: var(--light-base-select);
		vertical-align:bottom;
		padding: 0 16px;
	}

	.select-checkbox__itens {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}

	.select-checkbox__label {
		color: var(--neutral-primary);
		opacity: .6;
		padding-left: 8px;
		cursor: pointer;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.select-checkbox__oppened {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.select-checkbox__list__wrapper {
		position: absolute;
		top: 60px;
		width: 100%;
		left: 0;
		background-color: var(--light-background-primary);
	}
</style>
