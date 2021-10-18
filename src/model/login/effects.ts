import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import message from 'antd/lib/message';
import { send } from '@/utility/tcp-server';
import { CommandType, SocketType } from '@/schema/socket';

const { Fetch } = SocketType;

export default {

    /**
     * 登录
     */
    *login({ payload }: AnyAction, { fork, put }: EffectsCommandMap) {

        const { username, password } = payload;
        yield put({ type: 'setLoading', payload: true });
        try {
            console.log({
                cmd: CommandType.Login,
                msg: {
                    username, password
                }
            });
            yield fork(send, Fetch, {
                cmd: CommandType.Login,
                msg: {
                    username, password
                }
            });
        } catch (error) {
            message.error('登录失败');
        }
    }
}