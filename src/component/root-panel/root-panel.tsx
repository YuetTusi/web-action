import React, { PropsWithChildren, useState } from 'react';
import { useDispatch } from 'react-redux';
import { routerRedux } from 'dva/router';
import RootMenu from './root-menu';
import { WebHeader } from '../layout';
import ContentBox from '../layout/styled/content-box';
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
			<WebHeader />
			<ContentBox>
				<RootMenu />
				{props.children}
			</ContentBox>
		</div>
	);
};

export default RootPanel;
