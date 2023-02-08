import 'jest-styled-components';
// @ts-ignore
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from 'components/atoms/Button';

import { defaultTheme } from 'helpers/themes';
import { wrapWithProviders } from 'tests/provider';

describe('<Button />', () => {
	beforeEach(() => {
		render(
			wrapWithProviders(
				<Button type={'primary'} label={'Test Label'} handlePress={() => console.log('Test Click')} />
			)
		);
	});

	test(`
            <Button 
                type={"primary"}
                label={"Test Label"}
                handlePress={() => console.log("Test Click")}
            />
    `, () => {
		expect(screen).toBeDefined();
	});
});

test('Simulates click', () => {
	const onButtonClick = jest.fn();
	render(
		wrapWithProviders(
			<Button type={'primary'} label={'Test Label'} handlePress={onButtonClick} testingCtx={'test-button'} />
		)
	);
	fireEvent.click(screen.getByTestId('test-button'));
	expect(onButtonClick).toHaveBeenCalledTimes(1);
});

test('Simulates disabled', () => {
	const onButtonClick = jest.fn();
	render(
		wrapWithProviders(
			<Button
				type={'primary'}
				label={'Test Label'}
				handlePress={onButtonClick}
				disabled={true}
				loading={false}
				testingCtx={'test-button-disabled'}
			/>
		)
	);
	const button = screen.getByTestId('test-button-disabled');
	expect(button).toBeDisabled();
});

test('Simulates style', () => {
	render(
		wrapWithProviders(
			<Button
				type={'primary'}
				label={'Test Label'}
				handlePress={undefined}
				disabled={true}
				loading={false}
				testingCtx={'test-button-styles'}
			/>
		)
	);
	const button = screen.getByTestId('test-button-styles');
	expect(button).toHaveStyleRule('background', defaultTheme.colors.button.primary.background);
});
