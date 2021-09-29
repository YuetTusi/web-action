import React, { PropsWithChildren } from 'react';
import { useDispatch } from 'react-redux';
import { routerRedux } from 'dva/router';
import { WebHeader } from '../layout';
import { RootPanelProp } from './props';

/**
 * 视图根组件
 */
const RootPanel = (props: PropsWithChildren<RootPanelProp>) => {
	const dispatch = useDispatch();
	const username = sessionStorage.getItem('username');

	if (username === null) {
		dispatch(routerRedux.push('/login'));
	}

	return (
		<div style={{ height: '100%', backgroundColor: '#bbc8cb' }}>
			<WebHeader title="目标查询" />
			{props.children}
		</div>
	);
};

export default RootPanel;
