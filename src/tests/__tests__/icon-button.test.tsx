import 'jest-styled-components';
// @ts-ignore
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';

import { IconButton } from 'components/atoms/IconButton';

import { defaultTheme } from 'helpers/themes';
import { wrapWithProviders } from 'tests/provider';

describe('<IconButton />', () => {
	beforeEach(() => {
		render(wrapWithProviders(<IconButton type={'primary'} sm warning src={'ASSET'} handlePress={() => console.log('Test Click')} />));
	});

	test(`
        <IconButton
            type={"primary"}
            sm
            warning
            src={"ASSET"}
            handlePress={handleClose}
        />
    `, () => {
		expect(screen).toBeDefined();
	});
});

test('Simulates click', () => {
	const onButtonClick = jest.fn();
	render(wrapWithProviders(<IconButton type={'primary'} sm warning src={'ASSET'} handlePress={onButtonClick} testingCtx={'test-icon-button'} />));
	fireEvent.click(screen.getByTestId('test-icon-button'));
	expect(onButtonClick).toHaveBeenCalledTimes(1);
});

test('Simulates disabled', () => {
	const onButtonClick = jest.fn();
	render(
		wrapWithProviders(
			<IconButton type={'primary'} sm warning disabled src={'ASSET'} handlePress={onButtonClick} testingCtx={'test-icon-button-disabled'} />
		)
	);
	const button = screen.getByTestId('test-icon-button-disabled');
	expect(button).toBeDisabled();
});

test('Simulates style', () => {
	const onButtonClick = jest.fn();
	render(wrapWithProviders(<IconButton type={'alt1'} sm src={'ASSET'} handlePress={onButtonClick} testingCtx={'test-icon-button-styles'} />));
	const button = screen.getByTestId('test-icon-button-styles');
	expect(button).toHaveStyleRule('background', defaultTheme.colors.button.alt1.background);
});
