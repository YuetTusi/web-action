import { SubscriptionAPI } from 'dva';
import server from '@/utility/tcp-server';
import { Command, SocketType } from '@/schema/socket';

export default {

    receiveFetch({ }: SubscriptionAPI) {
        server.on(SocketType.Fetch, (command: Command) => {
            console.log(command);
        });
    }
};