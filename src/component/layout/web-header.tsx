import styled from 'styled-components';
import React, { FC, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { routerRedux } from 'dva';

const HeaderBox = styled.div`
	display: flex;
	flex-direction: row;
	height: 64px;
	background-color: #fff;

	.caption {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #24a8c8;
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
`;

const WebHeader: FC<{ title: string }> = ({ title }) => {
	const dispatch = useDispatch();

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
				<div>{title}</div>
				<div>
					<label htmlFor="span">可用次数</label>
					<span>6</span>
					<label htmlFor="span">有效期</label>
					<span>2021-01-01</span>
					<div>
						<a onClick={logoutClick}>退出</a>
					</div>
				</div>
			</div>
		</HeaderBox>
	);
};

export { WebHeader };
