import React, { FC } from 'react';
import { routerRedux, useDispatch } from 'dva';
import RootPanel from '@/component/root';

const LogManage: FC<{}> = () => {
	const dispatch = useDispatch();

	return (
		<RootPanel>
			<div>LogManage</div>
		</RootPanel>
	);
};

export default LogManage;