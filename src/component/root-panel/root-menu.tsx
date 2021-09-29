import styled from 'styled-components';
import React, { FC } from 'react';
import { routerRedux, useDispatch } from 'dva';
import Menu from 'antd/lib/menu';
import AimOutlined from '@ant-design/icons/AimOutlined';
import FileSearchOutlined from '@ant-design/icons/FileSearchOutlined';
import HistoryOutlined from '@ant-design/icons/HistoryOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

const { Item } = Menu;

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

	return (
		<MenuBox>
			<Menu mode="inline" theme="dark">
				<Item
					onClick={() => {
						dispatch(routerRedux.push('/index'));
					}}
					icon={<AimOutlined />}
					key="M_0">
					目标查询
				</Item>
				<Item
					onClick={() => {
						dispatch(routerRedux.push('/batch'));
					}}
					icon={<FileSearchOutlined />}
					key="M_1">
					批量查询
				</Item>
				<Item
					onClick={() => {
						dispatch(routerRedux.push('/log-manage'));
					}}
					icon={<HistoryOutlined />}
					key="M_2">
					日志管理
				</Item>
				<Item
					onClick={() => {
						dispatch(routerRedux.push('/manage-center'));
					}}
					icon={<SettingOutlined />}
					key="M_3">
					管理中心
				</Item>
			</Menu>
		</MenuBox>
	);
};

export default RootMenu;
