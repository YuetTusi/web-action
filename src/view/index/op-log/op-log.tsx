import React, { FC } from 'react';
import { routerRedux, useDispatch } from 'dva';
import RootPanel from '@/component/root';

/**
 * 操作日志
 */
const OpLog: FC<{}> = () => {
	const dispatch = useDispatch();

	return (
		<RootPanel>
			<div>OpLog</div>
		</RootPanel>
	);
};

export default OpLog;
