import React, { FC } from 'react';
import { routerRedux, useDispatch } from 'dva';
import RootPanel from '@/component/root';

/**
 * 查询日志
 */
const SearchLog: FC<{}> = () => {
	const dispatch = useDispatch();

	return (
		<RootPanel>
			<div>SearchLog</div>
		</RootPanel>
	);
};

export default SearchLog;
