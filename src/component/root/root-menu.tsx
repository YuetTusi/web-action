import styled from 'styled-components';
import React, { FC, Key, useEffect, useState } from 'react';
import { routerRedux, useDispatch, useLocation, useSelector } from 'dva';
import Menu from 'antd/lib/menu';
import MobileOutlined from '@ant-design/icons/MobileOutlined';
import FileSearchOutlined from '@ant-design/icons/FileSearchOutlined';
import CreditCardOutlined from '@ant-design/icons/CreditCardOutlined';
import BorderOutlined from '@ant-design/icons/BorderOutlined';
import HistoryOutlined from '@ant-design/icons/HistoryOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import AppstoreAddOutlined from '@ant-design/icons/AppstoreAddOutlined';
import { MenuNode, WebMenuState } from '@/model/component/web-menu';

const { Item, SubMenu } = Menu;
let defaultOpenKeys: string[] = [];

const MenuBox = styled.div`
	width: 240px;
	height: 100%;
	padding: 10px 0;
	background-color: #001529;
	span.ant-menu-title-content {
		color: #fff;
	}
`;

/**
 * 返回路由页面标题
 * @param url URL
 * @returns 标题
 */
const menuIcon = (url: string) => {
	switch (url) {
		case '/':
		case '/targetInquire':
			return <MobileOutlined />;
		case '/batchInquire':
			return <FileSearchOutlined />;
		case '/bank':
			return <CreditCardOutlined />;
		case '/bank-batch':
			return <FileSearchOutlined />;
		case '/journalManage':
			return <HistoryOutlined />;
		case '/systemsetup':
			return <SettingOutlined />;
		case '/installApp':
			return <AppstoreAddOutlined />;
		case '/installAppBatch':
			return <FileSearchOutlined />;
		case '/inquireJournal':
		case '/appLog':
			return <ClockCircleOutlined />;
		default:
			return <BorderOutlined />;
	}
};

/**
 * 菜单
 */
const RootMenu: FC<{}> = () => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const { data } = useSelector<any, WebMenuState>((state) => state.webMenu);
	const [selectKeys, setSelectKeys] = useState<string[]>([]);

	useEffect(() => {
		setSelectKeys([pathname]);
	}, [pathname]);

	const renderSubMenu = (nodes: MenuNode[]) => {
		return nodes.map((item) => {
			return (
				<Item
					onClick={() => {
						dispatch({ type: 'reading/setReading', payload: false });
						dispatch(routerRedux.push(item.menu_url));
					}}
					key={item.menu_url}>
					{item.menu_name}
				</Item>
			);
		});
	};

	const renderMenu = () => {
		const menu = data.map((item) => {
			if (item.childMenuInfos.length === 0) {
				return (
					<Item
						onClick={() => {
							dispatch({ type: 'reading/setReading', payload: false });
							if (item.menu_url === '/installAppBatch') {
								dispatch(routerRedux.push(`${item.menu_url}?type=batch`));
							} else {
								dispatch(routerRedux.push(item.menu_url));
							}
						}}
						icon={menuIcon(item.menu_url)}
						key={item.menu_url}>
						{item.menu_name}
					</Item>
				);
			} else {
				return (
					<SubMenu
						title={item.menu_name}
						icon={menuIcon(item.menu_url)}
						key={item.menu_url}>
						{renderSubMenu(item.childMenuInfos)}
					</SubMenu>
				);
			}
		});
		return (
			<Menu
				onOpenChange={menuOpenChange}
				defaultOpenKeys={defaultOpenKeys}
				selectedKeys={selectKeys}
				mode="inline"
				theme="dark">
				{menu}
			</Menu>
		);
	};

	const menuOpenChange = (keys: Key[]) => (defaultOpenKeys = keys.map((i) => i.toString()));

	return (
		<MenuBox>{renderMenu()}</MenuBox>
		// <MenuBox>
		// 	<Menu
		// 		onOpenChange={menuOpenChange}
		// 		defaultOpenKeys={defaultOpenKeys}
		// 		selectedKeys={selectKeys}
		// 		mode="inline"
		// 		theme="dark">
		// 		<Item
		// 			onClick={() => {
		// 				dispatch(routerRedux.push('/index'));
		// 			}}
		// 			icon={<AimOutlined />}
		// 			key="/index">
		// 			目标查询
		// 		</Item>
		// 		<Item
		// 			onClick={() => {
		// 				dispatch(routerRedux.push('/batch'));
		// 			}}
		// 			icon={<FileSearchOutlined />}
		// 			key="/batch">
		// 			目标批量查询
		// 		</Item>
		// 		<Item
		// 			onClick={() => {
		// 				dispatch(routerRedux.push('/bank'));
		// 			}}
		// 			icon={<CreditCardOutlined />}
		// 			key="/bank">
		// 			银行卡查询
		// 		</Item>
		// 		<Item
		// 			onClick={() => {
		// 				dispatch(routerRedux.push('/bank-batch'));
		// 			}}
		// 			icon={<FileSearchOutlined />}
		// 			key="/bank-batch">
		// 			银行卡批量查询
		// 		</Item>
		// 		<SubMenu title="日志管理" icon={<HistoryOutlined />} key="log">
		// 			<Item
		// 				onClick={() => {
		// 					dispatch(routerRedux.push('/search-log'));
		// 				}}
		// 				key="/search-log">
		// 				查询日志
		// 			</Item>
		// 			<Item
		// 				onClick={() => {
		// 					dispatch(routerRedux.push('/op-log'));
		// 				}}
		// 				key="/op-log">
		// 				操作日志
		// 			</Item>
		// 		</SubMenu>
		// 		<SubMenu title="管理中心" icon={<SettingOutlined />} key="center">
		// 			<Item
		// 				onClick={() => {
		// 					dispatch(routerRedux.push('/department'));
		// 				}}
		// 				key="/department">
		// 				部门管理
		// 			</Item>
		// 			<Item
		// 				onClick={() => {
		// 					dispatch(routerRedux.push('/role'));
		// 				}}
		// 				key="/role">
		// 				角色管理
		// 			</Item>
		// 			<Item
		// 				onClick={() => {
		// 					dispatch(routerRedux.push('/user'));
		// 				}}
		// 				key="/user">
		// 				帐户管理
		// 			</Item>
		// 		</SubMenu>
		// 	</Menu>
		// </MenuBox>
	);
};

export default RootMenu;
