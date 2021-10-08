import { Dispatch, routerRedux } from "dva";
import message from 'antd/lib/message';
import { Command, Result } from "@/schema/socket";
import { SingleDataSource } from "../single";

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
 * 目标查询结果
 */
export function getSingleResult(dispatch: Dispatch, { msg }: Command<Result<SingleDataSource[]>>) {

    if (msg.ret === 0) {
        dispatch({ type: 'single/setData', payload: msg.data });
    }
    // dispatch({ type: 'single/setData', payload: msg });
    dispatch({ type: 'reading/setReading', payload: false });
}

