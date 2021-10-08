import styled from 'styled-components';
import React, { FC, Key, useEffect, useState } from 'react';
import { routerRedux, useDispatch, useLocation } from 'dva';
import Menu from 'antd/lib/menu';
import AimOutlined from '@ant-design/icons/AimOutlined';
import FileSearchOutlined from '@ant-design/icons/FileSearchOutlined';
import HistoryOutlined from '@ant-design/icons/HistoryOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

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

const RootMenu: FC<{}> = () => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const [selectKeys, setSelectKeys] = useState<string[]>([]);

	useEffect(() => {
		setSelectKeys([pathname]);
	}, [pathname]);

	const menuOpenChange = (keys: Key[]) => (defaultOpenKeys = keys.map((i) => i.toString()));

	return (
		<MenuBox>
			<Menu
				onOpenChange={menuOpenChange}
				defaultOpenKeys={defaultOpenKeys}
				selectedKeys={selectKeys}
				mode="inline"
				theme="dark">
				<Item
					onClick={() => {
						dispatch(routerRedux.push('/index'));
					}}
					icon={<AimOutlined />}
					key="/index">
					目标查询
				</Item>
				<Item
					onClick={() => {
						dispatch(routerRedux.push('/batch'));
					}}
					icon={<FileSearchOutlined />}
					key="/batch">
					批量查询
				</Item>
				<SubMenu title="日志管理" icon={<HistoryOutlined />} key="log">
					<Item
						onClick={() => {
							dispatch(routerRedux.push('/search-log'));
						}}
						key="/search-log">
						查询日志
					</Item>
					<Item
						onClick={() => {
							dispatch(routerRedux.push('/op-log'));
						}}
						key="/op-log">
						操作日志
					</Item>
				</SubMenu>
				<Item
					onClick={() => {
						dispatch(routerRedux.push('/manage-center'));
					}}
					icon={<SettingOutlined />}
					key="/manage-center">
					管理中心
				</Item>
			</Menu>
		</MenuBox>
	);
};

export default RootMenu;