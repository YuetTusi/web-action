import React, { PropsWithChildren } from 'react';
import { withRouter } from 'dva/router';
// import {
// 	ContentBox,
// 	FooterBox,
// 	LeftBox,
// 	MainBox,
// 	RootContainer,
// 	TopBox
// } from '../styled/container';
import { RootPanelProp } from './props';

/**
 * 视图根组件
 */
const RootPanel = (props: PropsWithChildren<RootPanelProp>) => {
	return <div style={{ height: '100%' }}>{props.children}</div>;
};

export default withRouter(RootPanel);
