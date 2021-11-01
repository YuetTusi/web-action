import { Dispatch, routerRedux } from "dva";
import msgBox from 'antd/lib/message';
import log from '@/utility/log';
import { send } from "@/utility/tcp-server";
import { PAGESIZE } from "@/utility/helper";
import { SocketType, Command, CommandType, Result, Res } from "@/schema/socket";
import { SingleDataSource } from "../single";
import { UserInfoState } from "../user-info";
import { SearchLogData } from "../search-log";
import { UserData } from '../user';
import { OpLogData } from "../op-log";
import { RoleData } from "../role";
import { MenuNode } from "../component/web-menu";
import { DeptNode, RegionNode } from "../department";
import { BatchDataSource } from "../batch";
import { BankBatchState } from "../bank-batch";
import { BankState } from "../bank";

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
export function findUserInfo(dispatch: Dispatch, cmd: Command<Res<UserInfoState>>) {
    const { code, message, data } = cmd.msg;

    if (code >= 200 && code < 300) {
        dispatch({ type: 'userInfo/setData', payload: data });
    } else {
        log.error(`查询用户信息失败 @receive/listener/findUserInfo:${message}`);
    }
}

/**
 * 目标查询结果
 */
export function getSingleResult(dispatch: Dispatch, cmd: Command<Res<SingleDataSource[]>>) {

    const { message, code, data } = cmd.msg;

    if (code >= 200 && code < 300) {
        dispatch({ type: 'single/insertHistory', payload: data });
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
        dispatch({ type: 'batch/insertHistory', payload: data });
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
        dispatch({ type: 'bank/insertHistory', payload: data });
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
        dispatch({ type: 'bankBatch/insertHistory', payload: data });
        dispatch({ type: 'bankBatch/setData', payload: data });
    } else {
        msgBox.warn(message);
    }
    dispatch({ type: 'reading/setReading', payload: false });
}

/**
 * 查询日志
 */
export function queryLogResult(dispatch: Dispatch, cmd: Command<Result<{
    pageIndex: number,
    pageSize: number,
    totalPage: number,
    totalCount: number,
    rows: SearchLogData[]
}>>) {
    const { ret, data } = cmd.msg;
    if (ret === 0) {
        dispatch({
            type: 'searchLog/setPage',
            payload: {
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
                total: data.totalCount
            }
        });
        dispatch({
            type: 'searchLog/setData',
            payload: data.rows
        });
    }
    dispatch({ type: 'reading/setReading', payload: false });
}

/**
 * 操作日志
 */
export function operationLogResult(dispatch: Dispatch, cmd: Command<Result<{
    pageIndex: number,
    pageSize: number,
    totalPage: number,
    totalCount: number,
    rows: OpLogData[]
}>>) {
    const { ret, data } = cmd.msg;
    if (ret === 0) {
        dispatch({
            type: 'opLog/setPage',
            payload: {
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
                total: data.totalCount
            }
        });
        dispatch({
            type: 'opLog/setData',
            payload: data.rows
        });
    }
    dispatch({ type: 'reading/setReading', payload: false });
}

/**
 * 角色查询
 */
export function queryRoleResult(dispatch: Dispatch, cmd: Command<Result<{
    pageIndex: number,
    pageSize: number,
    totalPage: number,
    totalCount: number,
    rows: RoleData[]
}>>) {
    const { ret, data } = cmd.msg;
    if (ret === 0) {
        dispatch({
            type: 'role/setPage',
            payload: {
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
                total: data.totalCount
            }
        });
        dispatch({
            type: 'role/setData',
            payload: data.rows
        });
    }
    dispatch({ type: 'reading/setReading', payload: false });
}

/**
 * 部门树
 */
export function queryDeptByParentResult(dispatch: Dispatch, cmd: Command<Result<DeptNode[]>>) {

    const { ret, data } = cmd.msg;
    if (ret === 0) {
        dispatch({ type: 'deptTree/setTreeData', payload: data });
    }
}

/**
 * 地区树
 */
export function regionResult(dispatch: Dispatch, cmd: Command<Result<RegionNode[]>>) {

    const { ret, data } = cmd.msg;
    if (ret === 0) {
        dispatch({ type: 'department/setRegion', payload: data });
    }
}

/**
 * 添加部门结果
 */
export function addDeptResult(dispatch: Dispatch, cmd: Command<Result<any>>) {

    const { ret, message } = cmd.msg;
    if (ret === 0) {
        msgBox.info(message);
        send(Fetch, { cmd: CommandType.QueryDeptByParent, msg: null });
    } else {
        msgBox.warn(message);
    }
}


/**
 * 更新部门结果
 */
export function updateDeptResult(dispatch: Dispatch, cmd: Command<Result<any>>) {

    const { ret, message } = cmd.msg;
    if (ret === 0) {
        msgBox.info(message);
        send(Fetch, { cmd: CommandType.QueryDeptByParent, msg: null });
    } else {
        msgBox.warn(message);
    }
    dispatch({ type: 'reading/setReading', payload: false });
}


/**
 * 删除部门结果
 */
export function delDeptResult(dispatch: Dispatch, cmd: Command<Result<any>>) {

    const { ret, message } = cmd.msg;
    if (ret === 0) {
        msgBox.info(message);
        send(Fetch, { cmd: CommandType.QueryDeptByParent, msg: null });
    } else {
        msgBox.warn(message);
    }
    dispatch({ type: 'reading/setReading', payload: false });
}

/**
 * 帐户数据
 */
export function queryUserByDeptResult(dispatch: Dispatch, cmd: Command<Result<{
    pageIndex: number,
    pageSize: number,
    totalPage: number,
    totalCount: number,
    rows: UserData[]
}>>) {

    const { ret, data } = cmd.msg;
    if (ret === 0) {
        dispatch({
            type: 'user/setPage',
            payload: {
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
                total: data.totalCount
            }
        });
        dispatch({
            type: 'user/setData',
            payload: data.rows
        });
    }
    dispatch({ type: 'reading/setReading', payload: false });
}

/**
 * 帐号动作结果
 * # 共用此方法反馈的操作有：充值，启用/禁用，重置密码，添加，编辑，删除
 */
export function userActionResult(dispatch: Dispatch, cmd: Command<Result<any>>) {
    const { ret, message } = cmd.msg;
    if (ret === 0) {
        msgBox.info(message);
        send(Fetch, {
            cmd: CommandType.QueryUserByDept, msg: {
                keyword: '',
                fil_deptId: '',
                pageIndex: 1,
                pageSize: PAGESIZE
            }
        });
    } else {
        msgBox.warn(message);
    }
    dispatch({ type: 'reading/setReading', payload: false });
}
