import React, { FC } from 'react';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import Badge from 'antd/lib/badge';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import { CaseSort } from '@/schema/common';
import { DescBox } from './styled/disc-style';
import Desc from './desc';
import { ResultModalProp } from './props';

const { Ribbon } = Badge;

const renderRibbon = (type: CaseSort) => {
	switch (type) {
		case CaseSort.Porn:
			return (
				<Ribbon text="涉黄" placement="start" color="gold">
					<div className="caption">查询结果</div>
				</Ribbon>
			);
		case CaseSort.PyramidSales:
			return (
				<Ribbon text="传销" placement="start" color="green">
					<div className="caption">查询结果</div>
				</Ribbon>
			);
		case CaseSort.Bet:
			return (
				<Ribbon text="涉赌" placement="start" color="geekblue">
					<div className="caption">查询结果</div>
				</Ribbon>
			);
		default:
			return null;
	}
};

/**
 * 结果展示弹框
 */
const ResultModal: FC<ResultModalProp> = ({ visbile, type, data, record, onCancel }) => {
	return (
		<Modal
			footer={[
				<Button onClick={() => onCancel!()} key="B_0">
					<CloseCircleOutlined />
					<span>取消</span>
				</Button>
			]}
			title={`查询结果 ${record?.keyword ?? ''}`}
			visible={visbile}
			onCancel={onCancel}
			width={650}
			destroyOnClose={true}
			centered={true}
			maskClosable={false}>
			<DescBox>
				{renderRibbon(type!)}
				<div className="content">
					<Desc type={type} data={data!} record={record} />
				</div>
			</DescBox>
		</Modal>
	);
};

ResultModal.defaultProps = {
	visbile: false,
	onCancel: () => {}
};

export default ResultModal;
