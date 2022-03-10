import SelectCheckbox from './SelectCheckbox.vue';
import { render } from '@testing-library/vue';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';

const propsData = {
	label: 'Filtre por status',
	options: [
		{
			text: 'Cancelado',
			value: 'cancelled',
			checked: false,
		},
		{
			text: 'Concluído',
			value: 'created',
			checked: false,
		},
		{
			text: 'Processando',
			value: 'processing',
			checked: false,
		},
		{
			text: 'Agendado',
			value: 'processed',
			checked: false,
		},
	]
};

describe('<SelectCheckbox>', () => {
	it('should render component', async () => {
		const { getByTestId } = render(SelectCheckbox, { propsData });

		const component = getByTestId('select-checkbox');

		expect(component).toBeInTheDocument();
	});

	it('should render component and have list of options not on screen', () => {
		const { queryByTestId } = render(SelectCheckbox, { propsData });

		const itensWrapper = queryByTestId('select-checkbox-itens');

		expect(itensWrapper).toBeNull();
	});

	it('should click checkbox component and open dropdown with options', async () => {
		const { getByText, queryByTestId } = render(SelectCheckbox, { propsData });

		const label = getByText('Filtre por status');
		await fireEvent.click(label);
		const itensWrapper = queryByTestId('select-checkbox-itens');

		expect(itensWrapper).toBeInTheDocument();
	});

	it('should select checkbox itens and replace label with selected itens', async () => {
		const { getByText, queryByText } = render(SelectCheckbox, { propsData });

		const labelBefore = getByText('Filtre por status');
		await fireEvent.click(labelBefore);
		const concluido = getByText('Concluído');
		const cancelado = getByText('Cancelado');

		await fireEvent.click(concluido);
		await fireEvent.click(cancelado);

		const labelAfter = queryByText('Concluído, Cancelado');

		expect(labelAfter).toBeInTheDocument();
	});

	it('should emit selected options', async () => {
		const { getByText, emitted } = render(SelectCheckbox, { propsData });
		
		const labelBefore = getByText('Filtre por status');
		await fireEvent.click(labelBefore);
		const concluido = getByText('Concluído');
		const cancelado = getByText('Cancelado');

		await fireEvent.click(concluido);
		await fireEvent.click(cancelado);

		expect(emitted()['selected-options']).toBeTruthy();
	});

});
