import { SubscriptionAPI } from 'dva';
import server, { send } from '@/utility/tcp-server';
import log from '@/utility/log';
import { Command, CommandType, SocketType } from '@/schema/socket';
import {
    addDeptResult,
    delDeptResult,
    findUserInfo, getSingleResult, menuResult, operationLogResult,
    queryDeptByParentResult,
    queryLogResult, queryRoleResult, regionResult, updateDeptResult
} from './listener';

const { Fetch } = SocketType;

export default {

    /**
     * 接收Socket消息
     */
    receiveFetch({ dispatch }: SubscriptionAPI) {
        server.on(Fetch, (command: Command) => {

            console.log(`接收命令: ${command.cmd}, 参数: ${JSON.stringify(command.msg)}`);
            log.info(`Receive command (${command.cmd}): ,msg: ${JSON.stringify(command.msg)}`);

            switch (command.cmd) {
                case CommandType.MenuResult:
                    menuResult(dispatch, command);
                    break;
                case CommandType.FindUserInfo:
                    findUserInfo(dispatch, command);
                    break;
                case CommandType.GetSingleResult:
                    getSingleResult(dispatch, command);
                    break;
                case CommandType.QueryLogResult:
                    queryLogResult(dispatch, command);
                    break;
                case CommandType.OperationLogResult:
                    operationLogResult(dispatch, command);
                    break;
                case CommandType.QueryRoleResult:
                    queryRoleResult(dispatch, command);
                    break;
                case CommandType.QueryDeptByParentResult:
                    queryDeptByParentResult(dispatch, command);
                    break;
                case CommandType.RegionResult:
                    regionResult(dispatch, command);
                    break;
                case CommandType.AddDeptResult:
                    addDeptResult(dispatch, command);
                    break;
                case CommandType.UpdateDeptResult:
                    updateDeptResult(dispatch, command);
                    break;
                case CommandType.DelDeptResult:
                    delDeptResult(dispatch, command);
                    break;
                default:
                    console.warn(`未知Command:${command.cmd}`);
                    log.warn(`Not known command: ${command.cmd}`);
                    break;
            }
        });
    },
    /**
     * UI启动
     */
    uiStart() {
        send(Fetch, { cmd: CommandType.UIStart, msg: null });
    },
    consoleClear({ }: SubscriptionAPI) {

        setTimeout(() => {
            // console.clear();
        }, 1200);
    }
};