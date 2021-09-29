import { AnyAction } from 'redux';
import { EffectsCommandMap, routerRedux } from 'dva';
import message from 'antd/lib/message';
import { send } from '@/utility/tcp-server';
import { CommandType, SocketType } from '@/schema/socket';

export default {

    /**
     * 登录
     */
    *login({ payload }: AnyAction, { call, put }: EffectsCommandMap) {

        const { username, password } = payload;
        const hide = message.loading('正在登录，请稍等..');
        console.log({ username, password });
        try {
            const result: boolean = yield call(send, SocketType.Fetch, {
                type: SocketType.Fetch,
                cmd: CommandType.Login,
                msg: {
                    username, password
                }
            });

            sessionStorage.setItem('username', username);
            yield put(routerRedux.push('/index'));
            console.log(result);
        } catch (error) {
            console.log(error);
        } finally {
            hide();
        }
    }
}