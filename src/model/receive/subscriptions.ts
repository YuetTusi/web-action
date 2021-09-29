import { routerRedux, SubscriptionAPI } from 'dva';
import server from '@/utility/tcp-server';
import { Command, SocketType } from '@/schema/socket';
import { loginResult } from './listener';

export default {

    receiveFetch({ dispatch }: SubscriptionAPI) {
        server.on(SocketType.Fetch, (command: Command) => {
            loginResult(dispatch, command);
        });
    },

    // test({ dispatch }: SubscriptionAPI) {
    //     setTimeout(() => {
    //         sessionStorage.setItem('username', 'test');
    //         dispatch(routerRedux.push('/index'));
    //     }, 2000);
    // }
};