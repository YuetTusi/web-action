import { Dispatch, routerRedux } from "dva";
import msgBox from 'antd/lib/message';
import { SocketType, Command, Result, Res } from "@/schema/socket";
import { SingleDataSource } from "../single";
import { MenuNode } from "../component/web-menu";
import { BatchDataSource } from "../batch";
import { BankBatchState } from "../bank-batch";
import { BankState } from "../bank";
import { InstalledApp } from "../installation";

const { Fetch } = SocketType;

/**
 * 登录结果
 */
export function loginResult(dispatch: Dispatch, cmd: Command<{ success: boolean, message: string }>) {

    const { success, message } = cmd.msg;
    msgBox.destroy();
    if (success) {
        msgBox.success('登录成功');
        dispatch(routerRedux.push('/targetInquire'));
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
export function bankBatchResult(dispatch: Dispatch, cmd: Command<Res<BankBatchState>>) {
    const { code, data, message } = cmd.msg;

    if (code >= 200 && code < 300) {
        // dispatch({ type: 'bankBatch/insertHistory', payload: data });
        dispatch({ type: 'bankBatch/setData', payload: data });
    } else {
        msgBox.warn(message);
    }
    dispatch({ type: 'reading/setReading', payload: false });
}

/**
 * 安装应用查询结果
 */
export function installationResult(dispatch: Dispatch, cmd: Command<Res<InstalledApp>>) {
    const { code, data, message } = cmd.msg;

    if (code >= 200 && code < 300) {
        dispatch({ type: 'installation/setData', payload: data });
    } else {
        msgBox.warn(message);
    }
    dispatch({ type: 'reading/setReading', payload: false });
}
