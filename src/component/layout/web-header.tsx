import styled from 'styled-components';
import React, { FC, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { routerRedux, useLocation } from 'dva';
import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined';

const HeaderBox = styled.div`
	display: flex;
	flex-direction: row;
	height: 64px;
	background-color: #fff;

	.caption {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #1890ff;
		color: #fff;
		font-size: 1.4rem;
		width: 256px;
		text-align: center;
	}
	.fn {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.brd {
		font-size: 1.2rem;
		padding-left: 1rem;
		& > span {
			margin-left: 4px;
		}
	}
	.info {
		label {
			&:after {
				content: '：';
			}
		}
		span {
			color: #1890ff;
			font-weight: bold;
			margin-right: 10px;
		}
		a {
			margin-right: 10px;
		}
	}
`;

const getTitle = (pathname: string) => {
	switch (pathname) {
		case '/':
		case '/index':
			return '目标查询';
		case '/batch':
			return '批量查询';
		case '/log-manage':
			return '日志管理';
		case '/manage-center':
			return '管理中心';
		default:
			return '';
	}
};

const WebHeader: FC<{}> = () => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	/**
	 * 登出Click
	 */
	const logoutClick = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		sessionStorage.clear();
		dispatch(routerRedux.push('/login'));
	};

	return (
		<HeaderBox>
			<div className="caption">网络行为查询系统</div>
			<div className="fn">
				<div className="brd">
					<span>{getTitle(pathname)}</span>
				</div>
				<div className="info">
					<label htmlFor="span">可用次数</label>
					<span>6</span>
					<label htmlFor="span">有效期</label>
					<span>2021-01-01</span>
					<a onClick={logoutClick}>退出</a>
				</div>
			</div>
		</HeaderBox>
	);
};

export { WebHeader };
