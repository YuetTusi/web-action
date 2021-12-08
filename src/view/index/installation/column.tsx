import React, { MouseEvent } from 'react';
import { Dispatch } from 'dva';
import { ColumnsType } from 'antd/lib/table';
import { InstalledApp } from '@/model/installation';

/**
 * 表头
 * @returns 列头定义
 */
const getColumn = (
	dispatch: Dispatch,
	keywordList: { md5: string; value: string }[] = [],
	searchType: string = ''
): ColumnsType<InstalledApp> => {
	return [
		{
			title: '手机号',
			dataIndex: 'pid',
			key: 'pid',
			render(value: string) {
				if (searchType === 'PHONE') {
					return keywordList.find((i) => i.md5 === value)?.value ?? '';
				} else {
					return value;
				}
			}
		},
		{
			title: 'IMEI',
			dataIndex: 'ieid',
			key: 'ieid',
			render(value: string) {
				if (searchType === 'IMEI') {
					return keywordList.find((i) => i.md5 === value)?.value ?? '';
				} else {
					return value;
				}
			}
		},
		{
			title: 'IMSI',
			dataIndex: 'isid',
			key: 'isid',
			render(value: string) {
				if (searchType === 'IMSI') {
					return keywordList.find((i) => i.md5 === value)?.value ?? '';
				} else {
					return value;
				}
			}
		},
		{
			title: 'OAID',
			dataIndex: 'oiid',
			key: 'oiid',
			render(value: string) {
				if (searchType === 'OAID') {
					return keywordList.find((i) => i.md5 === value)?.value ?? '';
				} else {
					return value;
				}
			}
		},
		// {
		// 	title: '在装应用',
		// 	dataIndex: 'appList',
		// 	key: 'appList'
		// },
		// {
		// 	title: '最近安装/卸载应用',
		// 	dataIndex: 'lastUpdateTimeList',
		// 	key: 'lastUpdateTimeList'
		// },
		// {
		// 	title: 'AppPkg',
		// 	dataIndex: 'apppkgList',
		// 	key: 'apppkgList'
		// },
		// {
		// 	title: '包名列表',
		// 	dataIndex: 'appNameList',
		// 	key: 'appNameList'
		// },
		// {
		// 	title: '30天内最近活跃时间',
		// 	dataIndex: 'lastActiveTime30List',
		// 	key: 'lastActiveTime30List'
		// },
		// {
		// 	title: '30天内活跃天数',
		// 	dataIndex: 'activeDay30List',
		// 	key: 'activeDay30List'
		// },
		{
			title: '详情',
			dataIndex: 'pid',
			key: 'pid',
			align: 'center',
			width: 60,
			render(value: string, record) {
				return (
					<a
						onClick={(event: MouseEvent<HTMLAnchorElement>) => {
							event.preventDefault();
							dispatch({ type: 'installation/setDetail', payload: record });
						}}>
						详情
					</a>
				);
			}
		}
	];
};

export { getColumn };
