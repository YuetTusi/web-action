import React, { FC, memo } from 'react';
import { useLocation, useSelector, routerRedux, useDispatch } from 'dva';
import { HeaderBox } from './styled/header-box';
import { UserInfoState } from '@/model/user-info';
import { routeCaption } from '@/router/index/create-router';

const WebHeader: FC<{}> = memo(() => {
	const dispatch = useDispatch();
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
			<div className="caption" onClick={() => dispatch(routerRedux.push('/login'))}>
				网络行为查询系统
			</div>
			<div className="fn">
				<div className="brd">
					<span>{routeCaption(pathname)}</span>
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
