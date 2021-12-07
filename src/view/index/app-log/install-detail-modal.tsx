import React, { FC } from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Empty from 'antd/lib/empty';
import Modal from 'antd/lib/modal';
import Descriptions from 'antd/lib/descriptions';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import { helper } from '@/utility/helper';
import Watermark from '@/component/watermark';
import { DetailBox, DetailPanel } from './styled/detail-box';
import { InstallDetailModalProp } from './prop';

const username = sessionStorage.getItem('username');
const { Item } = Descriptions;

/**
 * 渲染li
 */
const renderList = (list: string[], prefix = 'L') =>
	list.map((item, index) => (item === '' ? null : <li key={`${prefix}_${index}`}>{item}</li>));

const Desc: FC<{ data?: Record<string, any> }> = ({ data }) => {
	if (helper.isNullOrUndefined(data)) {
		return <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
	} else {
		const {
			ieid,
			isid,
			oiid,
			appList,
			lastActiveTime30List,
			activeDay30List,
			lastUpdateTimeList,
			apppkgList,
			appNameList
		} = data!;
		return (
			<DetailPanel>
				<Watermark mark={username ?? ''} />
				<Row gutter={8}>
					<Col span={24}>
						<Descriptions bordered={true} size="small">
							{/* <Item label="手机号">{pid ?? ''}</Item> */}
							<Item label="IMEI">{ieid ?? ''}</Item>
							<Item label="IMSI">{isid ?? ''}</Item>
							<Item label="OAID">{oiid ?? ''}</Item>
							{/* <Item label="30天内最近活跃时间">{lastActiveTime30List ?? ''}</Item>
							<Item label="30天内活跃天数">{activeDay30List ?? ''}</Item> */}
						</Descriptions>
					</Col>
				</Row>
				<Row gutter={8}>
					<Col span={12}>
						<DetailBox>
							<div className="caption">30天内最近活跃时间</div>
							<div className="list">
								<ul>
									{renderList(
										helper.isNullOrUndefined(lastActiveTime30List)
											? []
											: lastActiveTime30List.split(',')
									)}
								</ul>
							</div>
						</DetailBox>
					</Col>
					<Col span={12}>
						<DetailBox>
							<div className="caption">30天内活跃天数</div>
							<div className="list">
								<ul>
									{renderList(
										helper.isNullOrUndefined(activeDay30List)
											? []
											: activeDay30List.split(',')
									)}
								</ul>
							</div>
						</DetailBox>
					</Col>
				</Row>
				<Row gutter={8}>
					<Col span={12}>
						<DetailBox>
							<div className="caption">在装应用</div>
							<div className="list">
								<ul>
									{renderList(
										helper.isNullOrUndefined(appList) ? [] : appList.split(',')
									)}
								</ul>
							</div>
						</DetailBox>
					</Col>
					<Col span={12}>
						<DetailBox>
							<div className="caption">最近安装/卸载应用</div>
							<div className="list">
								<ul>
									{renderList(
										helper.isNullOrUndefined(lastUpdateTimeList)
											? []
											: lastUpdateTimeList.split(',')
									)}
								</ul>
							</div>
						</DetailBox>
					</Col>
				</Row>
				<Row gutter={8}>
					<Col span={12}>
						<DetailBox>
							<div className="caption">AppPkg</div>
							<div className="list">
								<ul>
									{renderList(
										helper.isNullOrUndefined(apppkgList)
											? []
											: apppkgList.split(',')
									)}
								</ul>
							</div>
						</DetailBox>
					</Col>
					<Col span={12}>
						<DetailBox>
							<div className="caption">包名列表</div>
							<div className="list">
								<ul>
									{renderList(
										helper.isNullOrUndefined(appNameList)
											? []
											: appNameList.split(',')
									)}
								</ul>
							</div>
						</DetailBox>
					</Col>
				</Row>
			</DetailPanel>
		);
	}
};

/**
 * 安装应用详情框
 * @returns
 */
const InstallDetailModal: FC<InstallDetailModalProp> = ({ visible, keyword, data, onCancel }) => {
	return (
		<Modal
			footer={[
				<Button onClick={() => onCancel()} key="B_0">
					<CloseCircleOutlined />
					<span>取消</span>
				</Button>
			]}
			onCancel={() => onCancel()}
			visible={visible}
			width={1040}
			title={`应用详情 ${helper.isNullOrUndefined(keyword) ? '' : keyword}`}
			destroyOnClose={true}
			centered={true}
			maskClosable={false}>
			<Desc data={data} />
		</Modal>
	);
};

export default InstallDetailModal;
