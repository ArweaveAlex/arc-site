import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { language } from 'helpers/language';
import * as urls from 'helpers/urls';
import * as windowUtils from 'helpers/window';

import { blogOrder } from '../order-blog';

import * as S from './styles';

function renderNavItems(path = '', blog: any = blogOrder) {
	const location = useLocation();
	const basePath = urls.blog;
	const active = location.pathname.replace(basePath, '');

	const items = [];
	for (let i = 0; i < blog.length; i++) {
		if (blog[i].path && !blog[i].children) {
			const fullPath = `${path ? path + '/' : path}${blog[i].path}`;
			items.push(
				<Link to={`${urls.blog}${fullPath}`} key={`file-${blog[i].path}`}>
					<S.NListItem disabled={false} active={fullPath === active}>
						{blog[i].name}
					</S.NListItem>
				</Link>
			);
		} else {
			if (blog[i].children) {
				items.push(
					<div key={`dir-${blog[i].name}`}>
						<S.NSubHeader>
							<p>{blog[i].name}</p>
						</S.NSubHeader>
						<S.NSubList>{renderNavItems(blog[i].path, blog[i].children)}</S.NSubList>
					</div>
				);
			}
		}
	}

	return items;
}

export default function Navigation() {
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
				<S.NContent className={'border-wrapper-alt'}>
					<Title onClick={desktop ? () => {} : () => setOpen(!open)}>
						<p>
							{language.siteTitle} {language.docsTitle}
						</p>
					</Title>
					<S.NList>{open && renderNavItems()}</S.NList>
				</S.NContent>
			</S.NWrapper>
		);
	}

	return getNav();
}
