import differenceBy from 'lodash/differenceBy';
import { Dispatch, routerRedux } from "dva";
import msgBox from 'antd/lib/message';
import { Command, Result, Res } from "@/schema/socket";
import { SingleDataSource } from "../single";
import { MenuNode } from "../component/web-menu";
import { BatchDataSource } from "../batch";
import { BankBatchState } from "../bank-batch";
import { BankState } from "../bank";
import { InstalledApp } from "../installation";
import { helper } from "@/utility/helper";
import { Document } from '@/schema/document';
import { UseType } from "@/schema/use-type";
import { SearchLogEntity } from "@/schema/search-log-entity";

const { useType } = helper.readConf()!;

/**
 * 登录结果
 */
export function loginResult(dispatch: Dispatch, cmd: Command<{ success: boolean, message: string }>) {

    const { success, message } = cmd.msg;
    msgBox.destroy();
    if (success) {
        msgBox.success('登录成功');
        switch (useType) {
            case UseType.WebAction:
            case UseType.WebAndAppAction:
                dispatch(routerRedux.push('/targetInquire'));
                break;
            case UseType.AppAction:
                dispatch(routerRedux.push('/installApp'));
                break;
        }
    } else {
        msgBox.warn(message);
    }
    dispatch({ type: 'login/setLoading', payload: false });
}

/**
 * 查询菜单数据
 */
export function menuResult(dispatch: Dispatch, cmd: Command<Result<MenuNode[]>>) {
    const { msg } = cmd;

    if (msg.ret === 0) {
        dispatch({ type: 'webMenu/setData', payload: msg.data });
    }
}

/**
 * 查询用户信息
 */
export function limitResult(dispatch: Dispatch, cmd: Command<{ frequency_limit: number }>) {
    const { frequency_limit } = cmd.msg;

    dispatch({ type: 'userInfo/setData', payload: { frequency_limit } });
}

/**
 * 手机号查询结果
 */
export function getSingleResult(dispatch: Dispatch, cmd: Command<Res<SingleDataSource[]>>) {

    const { message, code, data } = cmd.msg;

    if (code >= 200 && code < 300) {
        // dispatch({ type: 'single/insertHistory', payload: data });
        dispatch({ type: 'single/setData', payload: data });
    } else {
        msgBox.warn(message);
    }
    dispatch({ type: 'reading/setReading', payload: false });
}

/**
 * 批量查询结果
 */
export function getMultipleResult(dispatch: Dispatch, cmd: Command<Res<BatchDataSource[]>>) {

    const { code, message, data } = cmd.msg;

    if (code >= 200 && code < 300) {
        // dispatch({ type: 'batch/insertHistory', payload: data });
        dispatch({ type: 'batch/setData', payload: data });
    } else {
        msgBox.warn(message);
    }
    dispatch({ type: 'reading/setReading', payload: false });
}

/**
 * 银行卡查询结果
 */
export function bankResult(dispatch: Dispatch, cmd: Command<Res<BankState>>) {
    const { code, data, message } = cmd.msg;

    if (code >= 200 && code < 300) {
        // dispatch({ type: 'bank/insertHistory', payload: data });
        dispatch({ type: 'bank/setData', payload: data });
    } else {
        msgBox.warn(message);
    }
    dispatch({ type: 'reading/setReading', payload: false });
}

/**
 * 银行卡批量查询结果
 */
export function bankBatchResult(dispatch: Dispatch, cmd: Command<Res<{ result: BankBatchState }>>) {
    const { code, data, message } = cmd.msg;

    if (code >= 200 && code < 300) {
        // dispatch({ type: 'bankBatch/insertHistory', payload: data });
        dispatch({ type: 'bankBatch/setData', payload: data?.result ?? {} });
    } else {
        msgBox.warn(message);
    }
    dispatch({ type: 'reading/setReading', payload: false });
}

/**
 * 安装应用查询结果
 */
export function installationResult(dispatch: Dispatch, cmd: Command<Res<InstalledApp[]>>) {
    const { table, list, value, type } = cmd;
    const { code, data, message } = cmd.msg;

    if (code >= 200 && code < 300) {
        const nextLogs: SearchLogEntity[] = [];
        const diff = differenceBy<{ pid: string }, InstalledApp>(
            list.map((item: string) => ({ pid: item })), data, 'pid');//求差值

        let diff_index = 0;

        for (let i = 0; i < list.length; i++) {
            let index: number = -1;
            if (helper.isNullOrUndefined(data[i])) {
                //若返回结果少于list，那么补全记录
                data.push({ pid: diff[diff_index++].pid, oiid: '', isid: '', ieid: '' } as InstalledApp);
            }

            let k: string = '';
            switch (type) {
                case 'PHONE':
                    index = (list as string[]).findIndex((j) => j === data[i].pid); //找到md5的索引
                    break;
                case 'IMEI':
                    index = (list as string[]).findIndex((j) => j === data[i].ieid); //找到md5的索引
                    break;
                case 'IMSI':
                    index = (list as string[]).findIndex((j) => j === data[i].isid); //找到md5的索引
                    break;
                case 'OAID':
                    index = (list as string[]).findIndex((j) => j === data[i].oiid); //找到md5的索引
                    break;
                default:
                    k = '';
                    break;
            }

            if (index !== -1) {
                k = value[index] ?? '';//取索引对应的值
            }
            nextLogs.push({
                type: table as Document,
                keyword: k,
                result: { ...data[i], type }
            });
        }
        console.log(data);
        dispatch({ type: 'installation/setData', payload: data });
        dispatch({ type: 'appLog/insert', payload: nextLogs });
    } else {
        msgBox.warn(message);
    }
    dispatch({ type: 'reading/setReading', payload: false });
}
