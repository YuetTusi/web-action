import fs from 'fs';
import path from 'path';
import React, { FC, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Divider from 'antd/lib/divider';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import { Gambling, Pyramid } from '@/model/bank';
import Ribbon from 'antd/lib/badge/Ribbon';
import Card from 'antd/lib/card';
import { CardTitle } from '../index/styled/card-title';
import { CardItemList } from '../index/styled/card-item';
import { BankBatchState } from '@/model/bank-batch';
import { ipcRenderer, OpenDialogReturnValue, SaveDialogReturnValue } from 'electron';
import { helper } from '@/utility/helper';
import { CommandType, SocketType } from '@/schema/socket';
import { send } from '@/utility/tcp-server';

const cwd = process.cwd();
const isDev = process.env['NODE_ENV'] === 'development';
const { Item, useForm } = Form;

const getCard = (result: Record<string, { gambling: Gambling; pyramid: Pyramid }>) => {
	const next = Object.entries(result);
	if (next.length === 0) {
		return [];
	} else {
		let cards: Array<{ cardNo: string; gambling: Gambling; pyramid: Pyramid }> = [];
		for (let [k, v] of next) {
			cards.push({ cardNo: k, ...v });
		}
		return cards;
	}
};

const BankBatch: FC<{}> = () => {
	const dispatch = useDispatch();
	const { hit_gambling, hit_pyramid, hits, result } = useSelector<any, BankBatchState>(
		(state) => state.bankBatch
	);
	// useEffect(() => {
	// 	//legacy: 测试数据
	// 	dispatch({
	// 		type: 'bankBatch/setData',
	// 		payload: {
	// 			hits: 0,
	// 			hit_gambling: 0,
	// 			hit_pyramid: 0,
	// 			result: {
	// 				//银行卡号
	// 				'6213363479902259472': {
	// 					//赌博数据
	// 					gambling: {
	// 						hit: 1,
	// 						reg_count: 3,
	// 						balance: 0,
	// 						login_time: 2,
	// 						reg_time: 0,
	// 						is_agent: 1
	// 					},
	// 					//传销数据
	// 					pyramid: {
	// 						hit: 0
	// 					}
	// 				},
	// 				'6222032106001274118': {
	// 					gambling: {
	// 						hit: 0
	// 					},
	// 					pyramid: {
	// 						hit: 1,
	// 						reg_count: 1,
	// 						balance: 1,
	// 						login_time: 0,
	// 						reg_time: 0,
	// 						is_agent: 0
	// 					}
	// 				},
	// 				'6222032106001274115': {
	// 					gambling: {
	// 						hit: 0
	// 					},
	// 					pyramid: {
	// 						hit: 1,
	// 						reg_count: 1,
	// 						balance: 1,
	// 						login_time: 0,
	// 						reg_time: 0,
	// 						is_agent: 0
	// 					}
	// 				}
	// 			}
	// 		}
	// 	});
	// }, []);

	const [formRef] = useForm();

	/**
	 * 下载模板Click
	 */
	const downloadClick = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const { filePath }: SaveDialogReturnValue = await ipcRenderer.invoke('save-temp-file');

		if (filePath) {
			const srcPath = isDev
				? path.join(cwd, './asset/银行卡模板.txt')
				: path.join(cwd, './resources/asset/银行卡模板.txt');
			try {
				await fs.promises.copyFile(srcPath, filePath);
				message.success('下载成功');
			} catch (error) {
				console.log(error);
				message.error('下载失败');
			}
			//todo: 在此将模板文件拷到目标路径
		}
	};

	/**
	 * 选择文件
	 * @param defaultPath 默认路径
	 */
	const selectFileHandle = async (defaultPath?: string) => {
		const { setFieldsValue } = formRef;
		const { filePaths }: OpenDialogReturnValue = await ipcRenderer.invoke(
			'select-file',
			defaultPath
		);
		if (filePaths.length > 0) {
			const [filePath] = filePaths;
			setFieldsValue({ tempFilePath: filePath });
		}
	};

	/**
	 * 查询Click
	 * @param event
	 */
	const onSearchClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const { getFieldsValue } = formRef;
		try {
			const { tempFilePath } = getFieldsValue();
			if (helper.isNullOrUndefined(tempFilePath)) {
				message.destroy();
				message.warn('请选择模板文件');
			} else {
				console.log({ cmd: CommandType.BankBatch, msg: { path: tempFilePath } });
				send(SocketType.Fetch, { cmd: CommandType.BankBatch, msg: { path: tempFilePath } });
			}
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * 渲染结果
	 */
	const renderCards = () => {
		return getCard(result).map((item, index) => {
			return (
				<>
					<Divider orientation="left">{`卡号：${item.cardNo}`}</Divider>
					<Row gutter={[16, 24]} key={`${item.cardNo}_${index}`}>
						<Col span={12}>
							<Ribbon text="涉赌" placement="start" color="geekblue">
								<Card title={<CardTitle>目标结果</CardTitle>} size="small">
									<CardItemList>
										<li>
											<label>命中数量</label>
											<span>{item?.gambling?.hit ?? '--'}</span>
										</li>
										<li>
											<label>注册数量</label>
											<span>{item?.gambling?.reg_count ?? '--'}</span>
										</li>
										<li>
											<label>注册时间</label>
											<span>{item?.gambling?.reg_time ?? '--'}</span>
										</li>
										<li>
											<label>登录时间</label>
											<span>{item?.gambling?.login_time ?? '--'}</span>
										</li>
										<li>
											<label>余额</label>
											<span>{item?.gambling?.balance ?? '--'}</span>
										</li>
										<li>
											<label>是否代理</label>
											<span>
												{helper.isNullOrUndefined(item?.gambling?.is_agent)
													? '--'
													: item?.gambling?.is_agent === 0
													? '否'
													: '是'}
											</span>
										</li>
									</CardItemList>
								</Card>
							</Ribbon>
						</Col>
						<Col span={12}>
							<Ribbon text="传销" placement="start" color="green">
								<Card title={<CardTitle>目标结果</CardTitle>} size="small">
									<CardItemList>
										<li>
											<label>命中数量</label>
											<span>{item?.pyramid?.hit ?? '--'}</span>
										</li>
										<li>
											<label>注册数量</label>
											<span>--</span>
										</li>
										<li>
											<label>注册时间</label>
											<span>--</span>
										</li>
										<li>
											<label>登录时间</label>
											<span>--</span>
										</li>
										<li>
											<label>余额</label>
											<span>--</span>
										</li>
										<li>
											<label>是否代理</label>
											<span>--</span>
										</li>
									</CardItemList>
								</Card>
							</Ribbon>
						</Col>
					</Row>
				</>
			);
		});
	};

	return (
		<RootPanel>
			<PadBox>
				<Form form={formRef} layout="inline">
					<Item name="tempFilePath" label="选择模板">
						<Input
							onClick={() => selectFileHandle(__dirname)}
							readOnly={true}
							style={{ width: '260px' }}
						/>
					</Item>
					<Item>
						<Button onClick={onSearchClick} type="primary">
							<SearchOutlined />
							<span>查询</span>
						</Button>
					</Item>
					<Item>
						<Button onClick={downloadClick} type="default">
							<DownloadOutlined />
							<span>下载模板</span>
						</Button>
					</Item>
				</Form>
			</PadBox>
			{renderCards()}
		</RootPanel>
	);
};

export default BankBatch;
