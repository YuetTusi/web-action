import localeCN from 'antd/es/locale/zh_CN';
import ConfigProvider from 'antd/lib/config-provider';
import { ThemeProvider } from 'styled-components';
import React, { FC, lazy, Suspense } from 'react';
import { RouterAPI } from 'dva';
import { Router, Route, Switch } from 'dva/router';
import RootPanel from '@/component/root';
import Loading from '@/component/loading';
import Index from '@/view/index/index';
// import { NotFound } from '@/view/warn';
import { theme } from '@/styled/theme';
import { GlobalStyle } from '@/styled/global-style';
// import { GlobalStyle } from '@/component/styled/global-style';

/**
 * 路由配置
 * @param api 路由参数
 * @returns 路由
 */
const createRouter = (api?: RouterAPI) => {
	const { history } = api!;

	return (
		<ConfigProvider locale={localeCN} componentSize="middle">
			<ThemeProvider theme={theme}>
				<Router history={history}>
					<Switch>
						<Route
							path="/"
							exact={true}
							render={() => {
								const Next = lazy<FC<any>>(
									() => import('@/view/index/index/index')
								);
								return (
									<Suspense fallback={<Loading />}>
										<Next />
									</Suspense>
								);
							}}
						/>
						<Route
							path="/login"
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/index/login'));
								return (
									<Suspense fallback={<Loading />}>
										<Next />
									</Suspense>
								);
							}}
						/>
						<Route
							path="/index"
							render={() => {
								const Next = lazy<FC<any>>(
									() => import('@/view/index/index/index')
								);
								return (
									<Suspense fallback={<Loading />}>
										<Next />
									</Suspense>
								);
							}}
						/>
						<Route
							path="/batch"
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/index/batch'));
								return (
									<Suspense fallback={<Loading />}>
										<Next />
									</Suspense>
								);
							}}
						/>
						<Route
							path="/search-log"
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/index/search-log'));
								return (
									<Suspense fallback={<Loading />}>
										<Next />
									</Suspense>
								);
							}}
						/>
						<Route
							path="/op-log"
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/index/op-log'));
								return (
									<Suspense fallback={<Loading />}>
										<Next />
									</Suspense>
								);
							}}
						/>
						<Route
							path="/manage-center"
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/index/manage-center'));
								return (
									<Suspense fallback={<Loading />}>
										<Next />
									</Suspense>
								);
							}}
						/>
						<Route component={() => <h1>无此页面</h1>} />
					</Switch>
				</Router>
			</ThemeProvider>
			<GlobalStyle />
		</ConfigProvider>
	);
};

export { createRouter };
