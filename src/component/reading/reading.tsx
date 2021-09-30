import React, { FC } from 'react';
import { useSelector } from 'dva';
import styled from 'styled-components';
import Spin from 'antd/lib/spin';
import { ReadingState } from '@/model/component/reading';
const ReadingBox = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 21, 41, 0.333);
	.ant-spin {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -0.5rem;
		margin-left: -0.5rem;
	}
`;

/**
 * 读取中
 */
const Reading: FC<{}> = () => {
	const { reading } = useSelector<any, ReadingState>((state) => state.reading);

	return (
		<ReadingBox style={{ display: reading ? 'block' : 'none' }}>
			<Spin size="large" />
		</ReadingBox>
	);
};

export default Reading;
