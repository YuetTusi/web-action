import React, { FC } from 'react';
import styled from 'styled-components';
import Spin from 'antd/lib/spin';

const LoadingBox = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

/**
 * 加载中
 */
const Loading: FC<{ tip?: string }> = ({ tip }) => (
	<LoadingBox>
		<Spin tip={tip ?? '正在加载页面'} />
	</LoadingBox>
);

export default Loading;
