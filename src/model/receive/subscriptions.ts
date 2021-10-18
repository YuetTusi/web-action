import { ipcRenderer, IpcRendererEvent } from 'electron';
import { SubscriptionAPI } from 'dva';
import Modal from 'antd/lib/modal';
import server, { send } from '@/utility/tcp-server';
import log from '@/utility/log';
import { Command, CommandType, SocketType } from '@/schema/socket';
import {
    addDeptResult, bankBatchResult, bankResult, delDeptResult, findUserInfo,
    getMultipleResult, getSingleResult, loginResult, menuResult,
    operationLogResult, queryDeptByParentResult, queryLogResult, queryRoleResult,
    regionResult, updateDeptResult, userActionResult
} from './listener';

const { Fetch, Error } = SocketType;

export default {

    /**
     * 接收Socket消息
     */
    receiveFetch({ dispatch }: SubscriptionAPI) {
        server.on(Fetch, (command: Command) => {

            console.log(`接收命令: ${command.cmd}, 参数: ${JSON.stringify(command.msg)}`);
            log.info(`Receive command (${command.cmd}): ,msg: ${JSON.stringify(command.msg)}`);

            switch (command.cmd) {
                case CommandType.LoginResult:
                    loginResult(dispatch, command);
                    break;
                case CommandType.MenuResult:
                    menuResult(dispatch, command);
                    break;
                case CommandType.FindUserInfo:
                    findUserInfo(dispatch, command);
                    break;
                case CommandType.GetSingleResult:
                    getSingleResult(dispatch, command);
                    break;
                case CommandType.GetMultipleResult:
                    getMultipleResult(dispatch, command);
                    break;
                case CommandType.BankResult:
                    bankResult(dispatch, command);
                    break;
                case CommandType.BankBatchResult:
                    bankBatchResult(dispatch, command);
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
                case CommandType.QueryUserByDeptResult:

                    break;
                case CommandType.AddUserResult:
                case CommandType.UpdateUserResult:
                case CommandType.DelUserResult:
                case CommandType.RechargeResult:
                case CommandType.UserIsEnableResult:
                case CommandType.ResetPasswordResult:
                    userActionResult(dispatch, command);
                    break;
                default:
                    console.warn(`未知Command:${command.cmd}`);
                    log.warn(`Not known command: ${command.cmd}`);
                    break;
            }
        });
    },
    /**
     * Socket出错
     */
    onSocketError({ dispatch }: SubscriptionAPI) {
        server.on(Error, (port: number, type: string) => {

            dispatch({ type: 'login/setLoading', payload: false });
            dispatch({ type: 'reading/setReading', payload: false });
            Modal.destroyAll();
            Modal.warn({
                title: '服务中断',
                content: '服务通讯中断，软件将退出',
                okText: '是',
                zIndex: 9000,
                onOk() {
                    ipcRenderer.send('do-close', true);
                }
            });
        });
    },
    /**
     * UI启动
     */
    uiStart({ }: SubscriptionAPI) {
        send(Fetch, { cmd: CommandType.UIStart, msg: null });
    },
    exitApp() {
        ipcRenderer.on('will-close', (event: IpcRendererEvent) => {
            Modal.destroyAll();
            Modal.confirm({
                title: '退出',
                content: '确定退出？',
                okText: '是',
                cancelText: '否',
                zIndex: 9000,
                onOk() {
                    ipcRenderer.send('do-close', true);
                }
            });
        });

    },
    // consoleClear({ }: SubscriptionAPI) {

    //     setTimeout(() => {
    //         console.clear();
    //     }, 1200);
    // }
};