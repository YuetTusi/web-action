import { SubscriptionAPI } from 'dva';
import server from '@/utility/tcp-server';
import { Command, CommandType, SocketType } from '@/schema/socket';
import { findUserInfo, getSingleResult } from './listener';

export default {

    /**
     * 接收Socket消息
     */
    receiveFetch({ dispatch }: SubscriptionAPI) {
        server.on(SocketType.Fetch, (command: Command) => {

            switch (command.cmd) {
                case CommandType.FindUserInfo:
                    findUserInfo(dispatch, command);
                    break;
                case CommandType.GetSingleResult:
                    getSingleResult(dispatch, command);
                    break;
                default:
                    console.warn(`未知Command:${command.cmd}`);
                    break;
            }
        });
    },

    // test({ dispatch }: SubscriptionAPI) {
    //     setTimeout(() => {
    //         sessionStorage.setItem('username', 'test');
    //         dispatch(routerRedux.push('/index'));
    //     }, 2000);
    // }
};