import React, { FC } from 'react';
import Empty from 'antd/lib/empty';
import Tag from 'antd/lib/tag';
import { InstalledApp } from '@/model/installation';
import { helper } from '@/utility/helper';
import { EmptyBox } from './styled/detail-box';

/**
 * 应用变化展示
 */
const ChangeDesc: FC<{ data: InstalledApp | null }> = ({ data }) => {
	if (helper.isNullOrUndefined(data)) {
		return (
			<EmptyBox>
				<Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
			</EmptyBox>
		);
	}

	const { changePkgList, changePkgStatusList, changePkgTimeList, model } = data!;

	if (helper.isNullOrUndefined(changePkgList)) {
		return (
			<EmptyBox>
				<Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
			</EmptyBox>
		);
	}

	const pkgList = changePkgList.split(',');
	const len = pkgList.length;

	if (len === 0) {
		return (
			<EmptyBox>
				<Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
			</EmptyBox>
		);
	}

	const statusList = helper.isNullOrUndefined(changePkgStatusList)
		? []
		: changePkgStatusList.split(',');
	const timeList = helper.isNullOrUndefined(changePkgTimeList)
		? []
		: changePkgTimeList.split(',');
	let $dom: JSX.Element[] = [];
	for (let i = 0; i < len; i++) {
		$dom.push(
			<li key={`K_${i}`}>
				{statusList[i] === '-1' ? (
					<Tag color="red">卸载</Tag>
				) : (
					<Tag color="green">安装</Tag>
				)}
				{pkgList[i] ?? ''}（{timeList[i] ?? ''}）
			</li>
		);
	}

	return <ul>{$dom}</ul>;
};

export default ChangeDesc;
