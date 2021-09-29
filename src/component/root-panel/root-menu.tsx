import styled from 'styled-components';
import React, { FC } from 'react';
import { routerRedux, useDispatch } from 'dva';
import Menu from 'antd/lib/menu';
import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined';

const { Item } = Menu;

const MenuBox = styled.div`
	width: 256px;
	height: 100%;
	padding: 10px 0;
	background-color: #001529;
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
					icon={<AppstoreOutlined />}
					key="M_0">
					目标查询
				</Item>
				<Item
					onClick={() => {
						dispatch(routerRedux.push('/batch'));
					}}
					icon={<AppstoreOutlined />}
					key="M_1">
					批量查询
				</Item>
				<Item
					onClick={() => {
						dispatch(routerRedux.push('/log-manage'));
					}}
					icon={<AppstoreOutlined />}
					key="M_2">
					日志管理
				</Item>
				<Item
					onClick={() => {
						dispatch(routerRedux.push('/manage-center'));
					}}
					icon={<AppstoreOutlined />}
					key="M_3">
					管理中心
				</Item>
			</Menu>
		</MenuBox>
	);
};

export default RootMenu;
