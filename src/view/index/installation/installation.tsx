import debounce from 'lodash/debounce';
import path from 'path';
import { copyFile, readFile } from 'fs/promises';
import { ipcRenderer, OpenDialogReturnValue, SaveDialogReturnValue } from 'electron';
import React, { FC, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector, useLocation } from 'dva';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import Modal from 'antd/lib/modal';
import Table from 'antd/lib/table';
import message from 'antd/lib/message';
import { helper } from '@/utility/helper';
import { send } from '@/utility/tcp-server';
import { InstallationState, InstalledApp } from '@/model/installation';
// import { installationResult } from '@/model/receive/listener';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import ScrollPanel from '@/component/scroll-panel';
import { CommandType, SocketType } from '@/schema/socket';
import { Document } from '@/schema/document';
import DetailModal from './detail-modal';
import { ValidList } from '../batch/styled/valid-list';
import { InstallationProp, SearchForm } from './prop';
import { getColumn } from './column';

let memoValue = '';
let searchType = '';
let keywordList: Array<{ md5: string; value: string }> = []; //保存查询值与md5对应表
const { Fetch } = SocketType;
const { Option } = Select;
const cwd = process.cwd();
const isDev = process.env['NODE_ENV'] === 'development';
const { useForm, Item } = Form;
let isBatch = false;

// const temp: any = {
// 	cmd: 'installation-result',
// 	list: ['bb0be01b6f5e0c78dc3219322d781a86'],
// 	msg: {
// 		code: '200',
// 		data: [],
// 		msg: 'success',
// 		status: null
// 	},
// 	table: 'app-install-log',
// 	type: 'PHONE',
// 	value: ['13661027699']
// };
/**
 * 安装应用查询
 */
const Installation: FC<InstallationProp> = () => {
	const { search } = useLocation(); //type参数为batch为批量查询
	const [formRef] = useForm<SearchForm>();
	const dispatch = useDispatch();
	const { data, detail, loading } = useSelector<any, InstallationState>(
		(state) => state.installation
	);

	isBatch = search.split('=')[1] === 'batch';

	useEffect(() => {
		//legacy: Mock数据
		// dispatch({
		// 	type: 'installation/setData',
		// 	payload: [
		// 		{
		// 			activeDay30List:
		// 				',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
		// 			appNameList:
		// 				'小米换机,江西师大,夸克,PU口袋校园,酷狗音乐,小米运动,天气,WPS Office,屏幕录制,王者营地,艾希,快视频,米家授权,钉钉,阅读,扇贝单词英语版,支付宝,中国银行,扫一扫,掌上英雄联盟,小米商城,星火英语,爱奇艺播放器,菜鸟,微信,健康,拼多多,王者荣耀,知乎,小米金服安全组件,哔哩哔哩,云闪付,抖音,Keep,米家,和我信,批改网,计算器,中国大学MOOC,中国建设银行,智能出行,指南针,QQ邮箱,看个球,手机淘宝,便签,学小易,百度输入法小米版,学习通,全球上网工具插件,识货,小米金服安全组件,电子邮件,相册冲印组件,百度网盘,垃圾清理,小米画报,用户手册,WiFi万能钥匙,小米文档查看器（WPS定制）,拷貝漫畫,学习强国,ZzzFun,小米搜狐视频播放器插件,收音机,全球上网,高德地图,微博,QQ,手机知网,京东,瑞达法考,富贵论坛,luckin coffee,深蓝法考,游戏中心,QQ浏览器,得物(毒),网易云音乐,百度,英雄联盟手游,铁路12306,网易有道词典,系统语音引擎,小米卡包,万能遥控,小米云盘,腾讯会议,金山文档,腾讯视频,学信网,讯飞输入法小米版,驾车场景',
		// 			apppkgList:
		// 				'com.miui.huanji,com.supwisdom.jxnu,com.quark.browser,com.xyhui,com.kugou.android,com.xiaomi.hm.health,com.miui.weather2,cn.wps.moffice_eng,com.miui.screenrecorder,com.tencent.gamehelper.smoba,com.fantablade.icey,com.xiaomi.apps.videodaily,com.miui.mihome,com.alibaba.android.rimet,com.duokan.reader,com.shanbay.sentence,com.eg.android.AlipayGphone,com.chinamworld.bocmbci,com.xiaomi.scanner,com.tencent.qt.qtl,com.xiaomi.shop,tuoyan.com.xinghuo_daying,com.qiyi.video.sdkplayer,com.cainiao.wireless,com.tencent.mm,com.mi.health,com.xunmeng.pinduoduo,com.tencent.tmgp.sgame,com.zhihu.android,com.xiaomi.jr.security,tv.danmaku,com.unionpay,com.ss.android.ugc.aweme,com.gotokeep.keep,com.xiaomi.smarthome,com.jx.cmcc.ict.ibelieve,org.pigai.allround,com.miui.calculator,com.netease.edu.ucmooc,com.chinamworld.main,com.miui.smarttravel,com.miui.compass,com.tencent.androidqqmail,com.qqc.kangeqiu,com.taobao.taobao,com.miui.notes,com.xuexiaoyi.xxy,com.baidu.input,com.chaoxing.mobile,com.xiaomi.mimobile.noti,com.hupu.shihuo,com.xiaomi.mifisecurity,com.android.email,com.mimoprint,com.baidu.netdisk,com.miui.cleanmaster,com.mfashiongallery.emag,com.miui.userguide,com.snda.wifilocating,cn.wps.moffice_eng.xiaomi.lite,com.copymanga.app,cn.xuexi.android,org.daimhim.zzzfun,com.sohu.sohuvideo.miplayer,com.miui.fm,com.miui.virtualsim,com.autonavi.minimap,com.sina.weibo,com.tencent.mobileqq,com.cnki.client,com.jingdong.app.mall,com.yizhilu.ruida,net.fglt.app,com.lucky.luckyclient,com.neoteched.shenlancity,com.xiaomi,com.tencent.mtt,com.shizhuang.duapp,com.netease.cloudmusic,com.baidu.searchbox,com.tencent.lolm,com.MobileTicket,com.youdao.dict,com.xiaomi.mibrain.speech,com.xiaomi.pass,com.duokan.phone.remotecontroller,com.miui.newmidrive,com.tencent.wemeet,cn.wps.yun,com.tencent.qqlive,cn.com.chsi.chsiapp,com.iflytek.inputmethod.miui,com.xiaomi.drivemode',
		// 			cateNameList:
		// 				'其他类,,其他类,社交软件,媒体,其他类,电商,网络共享,,游戏类,游戏类,媒体,其他类,社交软件,学习类,学习类,其他类,其他类,其他类,游戏类,电商,学习类,媒体,快递类,社交软件,电商,电商,游戏类,社交软件,其他类,媒体,其他类,媒体,电商,其他类,电商,学习类,其他类,学习类,其他类,其他类,社交软件,邮箱,媒体,电商,其他类,学习类,其他类,学习类,其他类,电商,其他类,邮箱,其他类,网络共享,其他类,其他类,其他类,其他类,网络共享,,媒体,媒体,媒体,媒体,,出行,社交软件,社交软件,学习类,电商,学习类,,电商,学习类,其他类,其他类,电商,媒体,其他类,游戏类,出行,学习类,其他类,电商,其他类,网络共享,网络共享,网络共享,媒体,学习类,其他类,其他类',
		// 			changePkgList:
		// 				'com.tal.kaoyan,com.xiaomi.router,com.zhaozhao.zhang.chinalaw,com.taptap,com.tencent.mp,com.eusoft.ting.en,com.tmri.app.main',
		// 			changePkgStatusList: '-1,-1,-1,-1,-1,-1,-1',
		// 			changePkgTimeList:
		// 				'20210930 11:43:11,20210930 11:43:11,20210930 11:43:11,20210930 11:43:11,20210930 11:43:11,20210930 11:43:11,20210930 11:43:11',
		// 			ieid: null,
		// 			isid: null,
		// 			lastActiveTime30List:
		// 				',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
		// 			lastUpdateTime: '20210930',
		// 			model: 'REDMI K20',
		// 			oiid: null,
		// 			pid: '77cead680b92491deb51e1830d30bb78'
		// 		}
		// 	]
		// });
		// dispatch({ type: 'reading/setReading', payload: false });
		return () => {
			dispatch({ type: 'installation/setData', payload: [] });
		};
	}, []);

	/**
	 * 查询Click
	 */
	const searchClick = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		// installationResult(dispatch, temp);
		const { getFieldsValue } = formRef;
		try {
			const { tempFilePath, mobile, type } = getFieldsValue();

			searchType = type;

			if (isBatch) {
				//批量
				if (helper.isNullOrUndefined(tempFilePath) || tempFilePath === '') {
					message.destroy();
					message.warn('请选择模板文件');
					return;
				}

				memoValue = tempFilePath;
				const txt = await readFile(tempFilePath, { encoding: 'utf8' });
				const [errorList, passList] = helper.validateMobileList(txt.split('\n'));
				if (errorList.length === 0) {
					keywordList = passList;
					Modal.confirm({
						onOk() {
							dispatch({ type: 'reading/setReading', payload: true });
							console.log({
								cmd: CommandType.Installation,
								msg: {
									list: keywordList.map((i) => i.md5),
									value: keywordList.map((i) => i.value),
									type,
									table: Document.AppInstallLog
								}
							});
							send(Fetch, {
								cmd: CommandType.Installation,
								msg: {
									list: keywordList.map((i) => i.md5),
									value: keywordList.map((i) => i.value),
									type,
									table: Document.AppInstallLog
								}
							});
						},
						title: '查询提示',
						content: (
							<div>
								<ScrollPanel>
									{keywordList.map((i, index) => (
										<div key={`L_${index}`}>{i.value}</div>
									))}
								</ScrollPanel>
								<div>
									共查询{keywordList.length}个手机号，将
									<strong style={{ color: '#ff0000' }}>
										使用
										{keywordList.length}次
									</strong>
									查询，确定？
								</div>
							</div>
						),
						okText: '是',
						cancelText: '否'
					});
				} else {
					Modal.warn({
						title: '手机号格式有误，请修正',
						content: (
							<>
								<ValidList>
									{errorList.map((item, index) => {
										return (
											<li className="err" key={`E_${index}`}>
												{item}
											</li>
										);
									})}
								</ValidList>
							</>
						),
						okText: '确定'
					});
				}
			} else {
				//非批量
				if (helper.isNullOrUndefined(mobile) || mobile === '') {
					message.destroy();
					message.warn('请选填写手机号');
					return;
				}
				const [errorList, passList] = helper.validateMobileList([mobile]);
				if (errorList.length === 0) {
					keywordList = passList;
					Modal.confirm({
						onOk() {
							dispatch({ type: 'reading/setReading', payload: true });
							console.log({
								cmd: CommandType.Installation,
								msg: {
									list: keywordList.map((i) => i.md5),
									value: keywordList.map((i) => i.value),
									type,
									table: Document.AppInstallLog
								}
							});
							send(Fetch, {
								cmd: CommandType.Installation,
								msg: {
									list: keywordList.map((i) => i.md5),
									value: keywordList.map((i) => i.value),
									type,
									table: Document.AppInstallLog
								}
							});
						},
						title: '查询提示',
						content: (
							<div>
								<ScrollPanel>
									{keywordList.map((i, index) => (
										<div key={`L_${index}`}>{i.value}</div>
									))}
								</ScrollPanel>
								<div>
									共查询{keywordList.length}个手机号，将
									<strong style={{ color: '#ff0000' }}>
										使用
										{keywordList.length}次
									</strong>
									查询，确定？
								</div>
							</div>
						),
						okText: '是',
						cancelText: '否'
					});
				} else {
					Modal.warn({
						title: '手机号格式有误，请修正',
						content: (
							<>
								<ValidList>
									{errorList.map((item, index) => {
										return (
											<li className="err" key={`E_${index}`}>
												{item}
											</li>
										);
									})}
								</ValidList>
							</>
						),
						okText: '确定'
					});
				}
			}
		} catch (error) {
			console.log(error);
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
	 * 下载模板Click
	 */
	const downloadClick = debounce(
		async (event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			const { filePath }: SaveDialogReturnValue = await ipcRenderer.invoke('save-temp-file');

			if (filePath) {
				const srcPath = isDev
					? path.join(cwd, './asset/手机号模板.txt')
					: path.join(cwd, './resources/asset/手机号模板.txt');
				try {
					await copyFile(srcPath, filePath);
					message.success('下载成功');
				} catch (error) {
					console.log(error);
					message.error('下载失败');
				}
				//todo: 在此将模板文件拷到目标路径
			}
		},
		500,
		{ leading: true, trailing: false }
	);

	return (
		<RootPanel>
			<PadBox>
				<Form form={formRef} layout="inline">
					{isBatch ? (
						<Item name="tempFilePath" label="选择模板" initialValue={memoValue}>
							<Input
								onClick={() => selectFileHandle(__dirname)}
								placeholder="请选择模板文件"
								readOnly={true}
								style={{ width: '260px' }}
							/>
						</Item>
					) : (
						<Item label="手机号" name="mobile">
							<Input style={{ width: '260px' }} />
						</Item>
					)}
					<Item
						name="type"
						label="查询类型"
						initialValue="PHONE"
						style={{ width: '160px' }}>
						<Select>
							<Option value="PHONE">PHONE</Option>
							<Option value="IMEI">IMEI</Option>
							<Option value="IMSI">IMSI</Option>
							<Option value="OAID">OAID</Option>
						</Select>
					</Item>
					<Item>
						<Button onClick={searchClick} type="primary">
							<SearchOutlined />
							<span>查询</span>
						</Button>
					</Item>
					{isBatch ? (
						<Item>
							<Button onClick={downloadClick} type="default">
								<DownloadOutlined />
								<span>下载模板</span>
							</Button>
						</Item>
					) : null}
				</Form>
			</PadBox>

			<Table<InstalledApp>
				dataSource={data}
				columns={getColumn(dispatch, keywordList, searchType)}
				pagination={false}
				// pagination={{
				// 	total: data.length,
				// 	pageSize: PAGESIZE,
				// 	current: pageIndex,
				// 	onChange: onPageChange
				// }}
				rowKey={'apppkgList'}
				scroll={{ x: 'max-content' }}
				loading={loading}
			/>
			<DetailModal visible={detail !== null} data={detail} />
		</RootPanel>
	);
};
export default Installation;
