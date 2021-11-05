import React, { FC, memo } from 'react';
import { useDispatch, useLocation, useSelector } from 'dva';
import { routerRedux } from 'dva/router';
import { HeaderBox } from './styled/header-box';
import { UserInfoState } from '@/model/user-info';
import { routeCaption } from '@/router/index/create-router';

const WebHeader: FC<{}> = memo(() => {
	const { frequency_limit } = useSelector<any, UserInfoState>((state) => state.userInfo);
	const { pathname } = useLocation();
	const dispatch = useDispatch();

	return (
		<HeaderBox>
			<div onClick={() => dispatch(routerRedux.push('/login'))} className="caption">
				网络行为查询系统
			</div>
			<div className="fn">
				<div className="brd">
					<span>{routeCaption(pathname)}</span>
				</div>
				<div className="info">
					<label htmlFor="span">可用次数</label>
					<span>{frequency_limit}</span>
				</div>
			</div>
		</HeaderBox>
	);
});

export { WebHeader };
