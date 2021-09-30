import React, { PropsWithChildren } from 'react';
// import { useDispatch } from 'react-redux';
// import { routerRedux } from 'dva/router';
import RootMenu from './root-menu';
import { WebHeader } from '../layout';
import ContentBox from '../layout/styled/content-box';
import InnerBox from '../layout/styled/inner-box';
import { RootPanelProp } from './props';
import Reading from '../reading/reading';

/**
 * 视图根组件
 */
const RootPanel = (props: PropsWithChildren<RootPanelProp>) => {
	// const dispatch = useDispatch();
	// const username = sessionStorage.getItem('username');

	// if (username === null) {
	// 	dispatch(routerRedux.push('/login'));
	// }

	return (
		<div style={{ height: '100%', backgroundColor: '#bbc8cb' }}>
			<WebHeader />
			<ContentBox>
				<RootMenu />
				<InnerBox>
					{props.children}
					<Reading />
				</InnerBox>
			</ContentBox>
		</div>
	);
};

export default RootPanel;
