import React, { FC, useState } from 'react';
import Button from 'antd/lib/button';
import Empty from 'antd/lib/empty';
import Modal from 'antd/lib/modal';
import Tabs from 'antd/lib/tabs';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import { helper } from '@/utility/helper';
import { DetailBox, DetailPanel, EmptyBox } from './styled/detail-box';
import { InstalledApp } from '@/model/installation';
import AppNameDesc from './app-name-desc';
import ChangeDesc from './change-desc';
import { InstallDetailModalProp } from './prop';

const username = sessionStorage.getItem('username');
const { TabPane } = Tabs;

/**
 * 渲染li
 */
const renderList = (list: string[], prefix = 'L') => {
	if (list.length === 0) {
		return (
			<EmptyBox>
				<Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
			</EmptyBox>
		);
	} else {
		return (
			<ul>
				{list.map((item, index) =>
					item === '' ? null : <li key={`${prefix}_${index}`}>{item}</li>
				)}
			</ul>
		);
	}
};

const Desc: FC<{ data: InstalledApp | null }> = ({ data }) => {
	const [activeKey, setActiveKey] = useState('1');

	const onTabChange = (key: string) => setActiveKey(key);

	if (data === null) {
		return <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
	} else {
		const {
			// ieid,
			// isid,
			// oiid,
			appList,
			lastActiveTime30List,
			activeDay30List,
			lastUpdateTimeList,
			apppkgList,
			appNameList
		} = data;
		return (
			<DetailPanel>
				<div className="water-mark">{username}</div>
				<div className="water-mark">{username}</div>
				<div className="water-mark">{username}</div>
				<Tabs defaultActiveKey={activeKey} onChange={onTabChange}>
					<TabPane tab="30天内最近活跃时间" key="1">
						<DetailBox>
							<div className="list">
								{renderList(
									helper.isNullOrUndefined(lastActiveTime30List)
										? []
										: lastActiveTime30List.split(',')
								)}
							</div>
						</DetailBox>
					</TabPane>
					<TabPane tab="30天内活跃天数" key="2">
						<DetailBox>
							<div className="list">
								{renderList(
									helper.isNullOrUndefined(activeDay30List)
										? []
										: activeDay30List.split(',')
								)}
							</div>
						</DetailBox>
					</TabPane>
					<TabPane tab="在装应用" key="3">
						<DetailBox>
							<div className="list">
								{renderList(
									helper.isNullOrUndefined(appList) ? [] : appList.split(',')
								)}
							</div>
						</DetailBox>
					</TabPane>
					<TabPane tab="最近安装/卸载应用" key="4">
						<DetailBox>
							<div className="list">
								{renderList(
									helper.isNullOrUndefined(lastUpdateTimeList)
										? []
										: lastUpdateTimeList.split(',')
								)}
							</div>
						</DetailBox>
					</TabPane>
					<TabPane tab="App包名" key="5">
						<DetailBox>
							<div className="list">
								{renderList(
									helper.isNullOrUndefined(apppkgList)
										? []
										: apppkgList.split(',')
								)}
							</div>
						</DetailBox>
					</TabPane>
					<TabPane tab="应用名称" key="6">
						<DetailBox>
							<div className="list">
								<AppNameDesc data={data} />
							</div>
						</DetailBox>
					</TabPane>
					<TabPane tab="应用变化信息" key="7">
						<DetailBox>
							<div className="list">
								<ChangeDesc data={data} />
							</div>
						</DetailBox>
					</TabPane>
				</Tabs>
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
			title={`应用详情 ${data?.model ?? ''} ${helper.isNullOrUndefined(keyword) ? '' : keyword}`}
			destroyOnClose={true}
			centered={true}
			maskClosable={false}>
			<Desc data={data} />
		</Modal>
	);
};

export default InstallDetailModal;
