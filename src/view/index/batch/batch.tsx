import React, { FC } from 'react';
import { routerRedux, useDispatch } from 'dva';
import RootPanel from '@/component/root-panel';

const Batch: FC<{}> = () => {
	const dispatch = useDispatch();

	return (
		<RootPanel>
			<div>Batch</div>
		</RootPanel>
	);
};

export default Batch;
