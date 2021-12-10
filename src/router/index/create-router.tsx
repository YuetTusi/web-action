import React, { FC, lazy, Suspense } from 'react';
import { RouterAPI } from 'dva';
import { Router, Route, Switch } from 'dva/router';
import localeCN from 'antd/es/locale/zh_CN';
import ConfigProvider from 'antd/lib/config-provider';
import { ThemeProvider } from 'styled-components';
import Loading from '@/component/loading';
import { theme } from '@/styled/theme';
import { GlobalStyle } from '@/styled/global-style';
import ErrorBoundary from '@/component/error-boundary';

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
								const Next = lazy<FC<any>>(() => import('@/view/index/login'));
								return (
									<Suspense fallback={<Loading />}>
										<ErrorBoundary>
											<Next />
										</ErrorBoundary>
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
										<ErrorBoundary>
											<Next />
										</ErrorBoundary>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/targetInquire"
							render={() => {
								const Next = lazy<FC<any>>(
									() => import('@/view/index/index/index')
								);
								return (
									<Suspense fallback={<Loading />}>
										<ErrorBoundary>
											<Next />
										</ErrorBoundary>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/batchInquire"
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/index/batch'));
								return (
									<Suspense fallback={<Loading />}>
										<ErrorBoundary>
											<Next />
										</ErrorBoundary>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/bank"
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/index/bank'));
								return (
									<Suspense fallback={<Loading />}>
										<ErrorBoundary>
											<Next />
										</ErrorBoundary>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/bank-batch"
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/index/bank-batch'));
								return (
									<Suspense fallback={<Loading />}>
										<ErrorBoundary>
											<Next />
										</ErrorBoundary>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/inquireJournal"
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/index/search-log'));
								return (
									<Suspense fallback={<Loading />}>
										<ErrorBoundary>
											<Next />
										</ErrorBoundary>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/installApp"
							render={() => {
								const Next = lazy<FC<any>>(
									() => import('@/view/index/installation')
								);
								return (
									<Suspense fallback={<Loading />}>
										<ErrorBoundary>
											<Next />
										</ErrorBoundary>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/installAppBatch"
							render={() => {
								const Next = lazy<FC<any>>(
									() => import('@/view/index/installation')
								);
								return (
									<Suspense fallback={<Loading />}>
										<ErrorBoundary>
											<Next />
										</ErrorBoundary>
									</Suspense>
								);
							}}
						/>
						<Route
							path="/appLog"
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/index/app-log'));
								return (
									<Suspense fallback={<Loading />}>
										<ErrorBoundary>
											<Next />
										</ErrorBoundary>
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

/**
 * 返回路由页面标题
 * @param pathname 路由地址
 * @returns 标题
 */
const routeCaption = (pathname: string) => {
	switch (pathname) {
		case '/':
		case '/targetInquire':
			return '手机号查询';
		case '/batchInquire':
			return '手机号批量查询';
		case '/bank':
			return '银行卡查询';
		case '/bank-batch':
			return '银行卡批量查询';
		case '/inquireJournal':
			return '手机银行卡日志';
		case '/appLog':
			return '应用日志';
		case '/installApp':
			return '安装应用查询';
		case '/installAppBatch':
			return '安装应用批量查询';
		default:
			return '';
	}
};

export { createRouter, routeCaption };
