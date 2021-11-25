import React, { FC, memo } from 'react';
import { useLocation, useSelector } from 'dva';
import { HeaderBox } from './styled/header-box';
import { UserInfoState } from '@/model/user-info';
import { routeCaption } from '@/router/index/create-router';
import { helper } from '@/utility/helper';

const { title } = helper.readConf()!;

const WebHeader: FC<{}> = memo(() => {
	const { frequency_limit } = useSelector<any, UserInfoState>((state) => state.userInfo);
	const { pathname } = useLocation();
	// const dispatch = useDispatch();
	// onClick={() => dispatch(routerRedux.push('/login'))}
	return (
		<HeaderBox>
			<div className="caption">{title ?? ''}</div>
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
