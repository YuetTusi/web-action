import React, { FC } from 'react';
import { routerRedux, useDispatch } from 'dva';
import RootPanel from '@/component/root-panel';

const Index: FC<{}> = () => {
	const dispatch = useDispatch();

	return (
		<RootPanel>
			<div>Index</div>
		</RootPanel>
	);
};

export default Index;
