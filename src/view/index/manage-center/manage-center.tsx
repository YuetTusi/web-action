import React, { FC } from 'react';
import { routerRedux, useDispatch } from 'dva';
import RootPanel from '@/component/root-panel';

const ManageCenter: FC<{}> = () => {
	const dispatch = useDispatch();

	return (
		<RootPanel>
			<div>ManageCenter</div>
		</RootPanel>
	);
};

export default ManageCenter;
