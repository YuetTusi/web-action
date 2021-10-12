import React, { FC, lazy, Suspense } from 'react';
import { RouterAPI } from 'dva';
import { Router, Route, Switch } from 'dva/router';
import localeCN from 'antd/es/locale/zh_CN';
import ConfigProvider from 'antd/lib/config-provider';
import { ThemeProvider } from 'styled-components';
import Loading from '@/component/loading';
import { theme } from '@/styled/theme';
import { GlobalStyle } from '@/styled/global-style';

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
							path="/targetInquire"
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
							path="/batchInquire"
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
							path="/bank"
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/index/bank'));
								return (
									<Suspense fallback={<Loading />}>
										<Next />
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
										<Next />
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
										<Next />
									</Suspense>
								);
							}}
						/>
						<Route
							path="/operateJournal"
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
							path="/deptmanage"
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/index/department'));
								return (
									<Suspense fallback={<Loading />}>
										<Next />
									</Suspense>
								);
							}}
						/>
						<Route
							path="/rolemanage"
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/index/role'));
								return (
									<Suspense fallback={<Loading />}>
										<Next />
									</Suspense>
								);
							}}
						/>
						<Route
							path="/usermanage"
							render={() => {
								const Next = lazy<FC<any>>(() => import('@/view/index/user'));
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

/**
 * 返回路由页面标题
 * @param pathname 路由地址
 * @returns 标题
 */
const routeCaption = (pathname: string) => {
	switch (pathname) {
		case '/':
		case '/targetInquire':
			return '目标查询';
		case '/batchInquire':
			return '目标批量查询';
		case '/bank':
			return '银行卡查询';
		case '/bank-batch':
			return '银行卡批量查询';
		case '/journalManage':
			return '日志管理';
		case '/inquireJournal':
			return '查询日志';
		case '/operateJournal':
			return '操作日志';
		case '/systemsetup':
			return '管理中心';
		case '/deptmanage':
			return '部门管理';
		case '/rolemanage':
			return '角色管理';
		case '/usermanage':
			return '帐户管理';
		default:
			return '';
	}
};

export { createRouter, routeCaption };
