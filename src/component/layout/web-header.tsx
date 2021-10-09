import React, { FC, memo } from 'react';
import { useLocation, useSelector } from 'dva';
import { HeaderBox } from './styled/header-box';
import { UserInfoState } from '@/model/user-info';

const getTitle = (pathname: string) => {
	switch (pathname) {
		case '/':
		case '/index':
			return '目标查询';
		case '/batch':
			return '目标批量查询';
		case '/bank':
			return '银行卡查询';
		case '/bank-batch':
			return '银行卡批量查询';
		case '/log-manage':
			return '日志管理';
		case '/manage-center':
			return '管理中心';
		case '/search-log':
			return '查询日志';
		case '/op-log':
			return '操作日志';
		default:
			return '';
	}
};

const WebHeader: FC<{}> = memo(() => {
	const { frequency_limit, validate } = useSelector<any, UserInfoState>(
		(state) => state.userInfo
	);
	const { pathname } = useLocation();

	/**
	 * 登出Click
	 */
	// const logoutClick = (event: MouseEvent<HTMLAnchorElement>) => {
	// 	event.preventDefault();
	// 	sessionStorage.clear();
	// 	dispatch(routerRedux.push('/login'));
	// };

	return (
		<HeaderBox>
			<div className="caption">网络行为查询系统</div>
			<div className="fn">
				<div className="brd">
					<span>{getTitle(pathname)}</span>
				</div>
				<div className="info">
					<label htmlFor="span">可用次数</label>
					<span>{frequency_limit}</span>
					<label htmlFor="span">有效期</label>
					<span>{validate}</span>
				</div>
			</div>
		</HeaderBox>
	);
});

export { WebHeader };
