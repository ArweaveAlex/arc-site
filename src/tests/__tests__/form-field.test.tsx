import 'jest-styled-components';
// @ts-ignore
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { defaultTheme } from 'helpers/themes';
import { wrapWithProviders } from 'tests/provider';
import { FormField } from 'components/atoms/FormField';

describe('<FormField />', () => {
	const onChange = jest.fn();
	beforeEach(() => {
		render(wrapWithProviders(<FormField value={'Test Value'} onChange={onChange} disabled={false} invalid={{ status: false, message: null }} />));
	});

	test(`
            <FormField
                value={"Test Value"}
                onChange={onChange}
                disabled={false}
                invalid={{ status: false, message: null }}
            />
    `, () => {
		expect(screen).toBeDefined();
	});
});

test('Simulates initial input value', async () => {
	const onChange = jest.fn();
	render(wrapWithProviders(<FormField value={'Test Value'} onChange={onChange} disabled={false} invalid={{ status: false, message: null }} testingCtx={'test-form-field-init'} />));

	const input = screen.getByTestId('test-form-field-init');
	await waitFor(() => expect(input).toHaveDisplayValue('Test Value'));
});

test('Simulates style', () => {
	const onChange = jest.fn();
	render(wrapWithProviders(<FormField value={'Test Value'} onChange={onChange} disabled={false} invalid={{ status: true, message: 'Invalid Value' }} testingCtx={'test-form-field-styles'} />));
	const input = screen.getByTestId('test-form-field-styles');
	expect(input).toHaveStyleRule('border', `1px solid ${defaultTheme.colors.form.invalid.outline}`);
});

test('Simulates disabled', () => {
	const onChange = jest.fn();
	render(wrapWithProviders(<FormField value={'Test Value'} onChange={onChange} disabled={true} invalid={{ status: true, message: 'Invalid Value' }} testingCtx={'test-form-field-disabled'} />));
	const input = screen.getByTestId('test-form-field-disabled');
	expect(input).toBeDisabled();
});

test('Simulates input change', () => {
	const onChange = jest.fn();
	const { rerender } = render(wrapWithProviders(<FormField value={''} onChange={onChange} disabled={false} invalid={{ status: false, message: null }} testingCtx={'test-form-field-input'} />));
	const input = screen.getByTestId('test-form-field-input');
	fireEvent.change(input, { target: { value: 'Test Value' } });
	rerender(wrapWithProviders(<FormField testingCtx={'test-form-field-input'} value={'Test Value'} onChange={onChange} disabled={false} invalid={{ status: false, message: null }} />));
	expect((input as HTMLInputElement).value).toBe('Test Value');
});
