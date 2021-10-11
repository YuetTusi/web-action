import { SubscriptionAPI } from 'dva';
import server from '@/utility/tcp-server';
import log from '@/utility/log';
import { Command, CommandType, SocketType } from '@/schema/socket';
import { findUserInfo, getSingleResult, queryLogResult } from './listener';

export default {

    /**
     * 接收Socket消息
     */
    receiveFetch({ dispatch }: SubscriptionAPI) {
        server.on(SocketType.Fetch, (command: Command) => {

            console.log(`接收命令: ${command.cmd}, 参数: ${JSON.stringify(command.msg)}`);
            log.info(`Receive command (${command.cmd}): ,msg: ${JSON.stringify(command.msg)}`);

            switch (command.cmd) {
                case CommandType.FindUserInfo:
                    findUserInfo(dispatch, command);
                    break;
                case CommandType.GetSingleResult:
                    getSingleResult(dispatch, command);
                    break;
                case CommandType.QueryLogResult:
                    queryLogResult(dispatch, command);
                    break;
                default:
                    console.warn(`未知Command:${command.cmd}`);
                    break;
            }
        });
    },

    consoleClear({ }: SubscriptionAPI) {
        setTimeout(() => {
            console.clear();
        }, 1200);
    }
};