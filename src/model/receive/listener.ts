import { Dispatch, routerRedux } from "dva";
import message from 'antd/lib/message';
import { Command, Result } from "@/schema/socket";
import { SingleDataSource } from "../single";
import { UserInfoState } from "../user-info";
import { SearchLogData } from "../search-log";
import { OpLogData } from "../op-log";
import { RoleData } from "../role";
import { MenuNode } from "../component/web-menu";

/**
 * 登录结果
 */
export function loginResult(dispatch: Dispatch, cmd: Command<{ success: boolean, username: string }>) {

    const { username, success } = cmd.msg;
    dispatch({ type: 'login/setLoading', payload: false });
    message.destroy();
    if (success) {
        message.success('登录成功');
        sessionStorage.setItem('username', username);
        dispatch(routerRedux.push('/index'));
    } else {
        message.error('登录失败');
    }
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
export function findUserInfo(dispatch: Dispatch, cmd: Command<Result<UserInfoState>>) {
    const { msg } = cmd;

    if (msg.ret === 0) {
        dispatch({ type: 'userInfo/setData', payload: msg.data });
    }
}

/**
 * 目标查询结果
 */
export function getSingleResult(dispatch: Dispatch, cmd: Command<Result<SingleDataSource[]>>) {

    const { msg } = cmd;

    if (msg.ret === 0) {
        dispatch({ type: 'single/setData', payload: msg.data });
    }
    // dispatch({ type: 'single/setData', payload: msg });
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