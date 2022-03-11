<template>
	<div data-testid="select-checkbox" class="select-checkbox__wrapper" :class="{'select-checkbox__oppened': showDropdown}">
		<span class="select-checkbox__itens" @click="toggleDropdown()">
			<BaseIcon class="select-checkbox__icon" icon="ic_filter_list" colors="var(--element-primary)"/>
			<div v-if="selectedOptions.length" class="select-checkbox__label">{{ selectedTexts.join(', ') }}</div>
			<div v-else class="select-checkbox__label">{{ label }}</div>
		</span>
		<div data-testid="select-checkbox-itens" v-if="showDropdown" class="select-checkbox__list__wrapper">
			<Checkbox v-for="option in filterOptions" :key="option.value" :value="option.value" v-model="selectedOptions">{{ option.text }}</Checkbox>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Emit, Watch } from 'vue-property-decorator';
import { BaseIcon, Checkbox } from '@warrenbrasil/nebraska-web';
import { ISelectCheckboxOption } from '../../../types/ISelectCheckboxOption';
import { getSelectedCheckboxText } from '../../../helpers/transactions-parse';

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

	public showDropdown = false;
	
	public selectedOptions: string[] = [];
	public selectedTexts: string[] = [];

	private toggleDropdown() {
		this.showDropdown = !this.showDropdown;
	}

	@Watch('selectedOptions')
	private watchSelectedOptions(selectedOptions: string[]) {
		this.selectedTexts = getSelectedCheckboxText(selectedOptions, this.filterOptions);
		this.emitSelectedOptions(selectedOptions);
	}

	@Emit('selected-options')
  private emitSelectedOptions(selectedOptions: string[]) {
    return selectedOptions;
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
