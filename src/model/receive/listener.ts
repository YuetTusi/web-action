import { Dispatch, routerRedux } from "dva";
import message from 'antd/lib/message';
import { Command } from "@/schema/socket";

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
