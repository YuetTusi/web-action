import React, { FC } from 'react';
import Empty from 'antd/lib/empty';
import Tag from 'antd/lib/tag';
import { InstalledApp } from '@/model/installation';
import { helper } from '@/utility/helper';
import { EmptyBox } from './styled/detail-box';

/**
 * 应用名称展示
 */
const AppNameDesc: FC<{ data: InstalledApp | null }> = ({ data }) => {
	if (helper.isNullOrUndefined(data)) {
		return (
			<EmptyBox>
				<Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
			</EmptyBox>
		);
	}

	const { appNameList, cateNameList } = data!;

	if (helper.isNullOrUndefined(appNameList)) {
		return (
			<EmptyBox>
				<Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
			</EmptyBox>
		);
	}

	const nameList = appNameList.split(',');
	const len = nameList.length;

	if (len === 0) {
		return (
			<EmptyBox>
				<Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
			</EmptyBox>
		);
	}

	const categoryList = helper.isNullOrUndefined(cateNameList) ? [] : cateNameList.split(',');

	let $dom: JSX.Element[] = [];
	for (let i = 0; i < len; i++) {
		$dom.push(
			<li key={`K_${i}`}>
				<Tag>{categoryList[i] === '' ? '未知' : categoryList[i]}</Tag>
				{nameList[i] ?? ''}
			</li>
		);
	}

	return <ul>{$dom}</ul>;
};

export default AppNameDesc;
