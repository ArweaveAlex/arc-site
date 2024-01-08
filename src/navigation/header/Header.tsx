import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { IconButton } from 'components/atoms/IconButton';
import { ASSETS, DOM } from 'helpers/config';
import { NAV_PATHS } from 'helpers/paths';
import * as urls from 'helpers/urls';
import { checkDesktop, checkWindowResize, hideDocumentBody, showDocumentBody } from 'helpers/window';
import { useMutation } from 'hooks/useMutation';
import { WalletConnect } from 'wallet/WalletConnect';

import * as S from './styles';

export default function Header() {
	const hasSubheader = useMutation(DOM.subheader);

	const [open, setOpen] = React.useState(checkDesktop());
	const [desktop, setDesktop] = React.useState(checkDesktop());

	function handleWindowResize() {
		if (checkDesktop()) {
			setDesktop(true);
			setOpen(true);
		} else {
			setDesktop(false);
			setOpen(false);
		}
	}

	function handleNavStatus() {
		checkDesktop() ? setOpen(true) : setOpen(!open);
	}

	checkWindowResize(handleWindowResize);

	if (open && !checkDesktop()) {
		hideDocumentBody();
	} else {
		showDocumentBody();
	}

	function navList() {
		return (
			<S.NC>
				<S.NavPaths>
					{NAV_PATHS.map((path, index) => (
						<S.LinkWrapper key={index}>
							<Link to={path.href} onClick={() => setOpen(false)}>
								{path.name}
								{desktop && path.subpaths && <ReactSVG src={ASSETS.arrowDown} />}
							</Link>
							{path.subpaths && (
								<S.SubpathWrapper className={desktop ? 'border-wrapper' : ''}>
									{path.subpaths.map((path, index) => {
										return (
											<Link key={index} to={path.href} onClick={() => setOpen(false)}>
												{path.name}
											</Link>
										);
									})}
								</S.SubpathWrapper>
							)}
						</S.LinkWrapper>
					))}
				</S.NavPaths>
				<S.SC>
					<S.Connect show={true}>
						<WalletConnect callback={() => setOpen(!open)} />
					</S.Connect>
				</S.SC>
			</S.NC>
		);
	}

	function getNav() {
		if (desktop) {
			return navList();
		} else {
			return (
				<>
					<S.NCMobile>
						<S.MenuContainer>
							<S.Menu>
								<IconButton
									type={'primary'}
									warning={open}
									src={open ? ASSETS.close : ASSETS.menu}
									handlePress={handleNavStatus}
								/>
							</S.Menu>
						</S.MenuContainer>
					</S.NCMobile>
					{open && <S.OpenContainer hasSubheader={hasSubheader}>{navList()}</S.OpenContainer>}
				</>
			);
		}
	}

	return (
		<S.Wrapper>
			<S.NavContainer>
				<S.LogoContainer>
					<Link to={urls.base} onClick={() => setOpen(false)}>
						<S.LogoContent>
							<ReactSVG src={ASSETS.siteLogo} />
						</S.LogoContent>
					</Link>
				</S.LogoContainer>
				{getNav()}
			</S.NavContainer>
		</S.Wrapper>
	);
}
