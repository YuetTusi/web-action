import React, { FC } from 'react';
import { WatermarkProp } from './prop';
import { WaterMark } from './styled';

/**
 * 水印
 */
const Watermark: FC<WatermarkProp> = ({ mark }) => {

	return (
		<WaterMark>
			<span>{mark}</span>
			<span>{mark}</span>
			<span>{mark}</span>
		</WaterMark>
	);
};

export default Watermark;
