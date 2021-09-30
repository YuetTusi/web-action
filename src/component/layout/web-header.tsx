import React, { FC, MouseEvent, memo } from 'react';
import { useDispatch } from 'react-redux';
import { routerRedux, useLocation } from 'dva';
import { HeaderBox } from './styled/header-box';

const getTitle = (pathname: string) => {
	switch (pathname) {
		case '/':
		case '/index':
			return '目标查询';
		case '/batch':
			return '批量查询';
		case '/log-manage':
			return '日志管理';
		case '/manage-center':
			return '管理中心';
		default:
			return '';
	}
};

const WebHeader: FC<{}> = memo(() => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	/**
	 * 登出Click
	 */
	const logoutClick = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		sessionStorage.clear();
		dispatch(routerRedux.push('/login'));
	};

	return (
		<HeaderBox>
			<div className="caption">网络行为查询系统</div>
			<div className="fn">
				<div className="brd">
					<span>{getTitle(pathname)}</span>
				</div>
				<div className="info">
					<label htmlFor="span">可用次数</label>
					<span>6</span>
					<label htmlFor="span">有效期</label>
					<span>2021-01-01</span>
				</div>
			</div>
		</HeaderBox>
	);
});

export { WebHeader };
