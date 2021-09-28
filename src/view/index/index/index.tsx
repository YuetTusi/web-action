import React, { FC } from 'react';
import { routerRedux, useDispatch } from 'dva';

const Index: FC<{}> = () => {
	const dispatch = useDispatch();
	const hasLogin = sessionStorage.getItem('login');

	if (hasLogin === null) {
		dispatch(routerRedux.push('/login'));
	}

	return <div>Index</div>;
};

export default Index;
