import React from 'react';
import { Link } from 'react-router-dom';

import { LANGUAGE } from 'helpers/language';
import * as windowUtils from 'helpers/window';

import { getDocTree } from '../load-docs';

import * as S from './styles';

function renderNavItems(dir: any, path = '') {
	const items = [];

	if (dir.files) {
		items.push(
			...dir.files.map((file: any, index: any) => {
				const fullPath = `${path}/${file}`;
				return (
					<Link to={`/docs${fullPath}`} key={`file-${index}`}>
						<S.NListItem disabled={false}>{file}</S.NListItem>
					</Link>
				);
			})
		);
	}

	const subdirs = Object.keys(dir).filter((key) => key !== 'files');
	items.push(
		...subdirs.map((subdir, index) => {
			const subPath = `${path}/${subdir}`;
			return (
				<div key={`dir-${index}`}>
					<S.NSubHeader>
						<p>{subdir}</p>
					</S.NSubHeader>
					<S.NSubList>{renderNavItems(dir[subdir], subPath)}</S.NSubList>
				</div>
			);
		})
	);

	return items;
}

export default function Navigation() {
	const docTree = getDocTree();

	const [open, setOpen] = React.useState(windowUtils.checkDesktop());
	const [desktop, setDesktop] = React.useState(windowUtils.checkDesktop());

	function handleWindowResize() {
		if (windowUtils.checkDesktop()) {
			setDesktop(true);
			setOpen(true);
		} else {
			setDesktop(false);
			setOpen(false);
		}
	}

	windowUtils.checkWindowResize(handleWindowResize);

	function getNav() {
		const Title: any = desktop ? S.NTitle : S.NTitleMobile;

		return (
			<S.NWrapper>
				<S.NContent>
					<Title onClick={desktop ? () => {} : () => setOpen(!open)}>
						<p>{LANGUAGE.docs}</p>
					</Title>
					<S.NList>{open && renderNavItems(docTree)}</S.NList>
				</S.NContent>
			</S.NWrapper>
		);
	}

	return <div>{getNav() as any}</div>;
}
