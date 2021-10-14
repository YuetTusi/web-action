import { ipcRenderer, IpcRendererEvent } from 'electron';
import { SubscriptionAPI } from 'dva';
import Modal from 'antd/lib/modal';
import server, { send } from '@/utility/tcp-server';
import log from '@/utility/log';
import { Command, CommandType, SocketType } from '@/schema/socket';
import {
    addDeptResult, delDeptResult, findUserInfo, getSingleResult, menuResult,
    operationLogResult, queryDeptByParentResult, queryLogResult, queryRoleResult,
    regionResult, updateDeptResult, userActionResult
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
     * UI启动
     */
    uiStart({ dispatch }: SubscriptionAPI) {
        send(Fetch, { cmd: CommandType.UIStart, msg: null });
        send(Fetch, { cmd: CommandType.QueryDeptByParent, msg: null });
        //#Mock:
        // dispatch({
        //     type: 'deptTree/setTreeData', payload: [
        //         {
        //             "dept_id": "-1",
        //             "dept_name": "部门",
        //             "parent_id": null,
        //             "description": "部门地区无法选择",
        //             "city_code": "100000",
        //             "parent_city_code": null,
        //             "create_id": null,
        //             "gmt_create": null,
        //             "gmt_modified": null,
        //             "childDeptInfos": [
        //                 {
        //                     "dept_id": "001",
        //                     "dept_name": "测试",
        //                     "parent_id": "-1",
        //                     "description": "",
        //                     "city_code": "420000",
        //                     "parent_city_code": "100000",
        //                     "create_id": null,
        //                     "gmt_create": null,
        //                     "gmt_modified": null,
        //                     "childDeptInfos": [
        //                         {
        //                             "dept_id": "001001",
        //                             "dept_name": "测试123",
        //                             "parent_id": "001",
        //                             "description": "测试部的测试小组1",
        //                             "city_code": "110100",
        //                             "parent_city_code": "420000",
        //                             "create_id": null,
        //                             "gmt_create": null,
        //                             "gmt_modified": null,
        //                             "childDeptInfos": [
        //                                 {
        //                                     "dept_id": "001001001",
        //                                     "dept_name": "测试子部门",
        //                                     "parent_id": "001001",
        //                                     "description": null,
        //                                     "city_code": "110116",
        //                                     "parent_city_code": "110100",
        //                                     "create_id": null,
        //                                     "gmt_create": null,
        //                                     "gmt_modified": null
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     "dept_id": "002",
        //                     "dept_name": "武汉演示",
        //                     "parent_id": "-1",
        //                     "description": "",
        //                     "city_code": "420100",
        //                     "parent_city_code": "100000",
        //                     "create_id": null,
        //                     "gmt_create": null,
        //                     "gmt_modified": null
        //                 },
        //                 {
        //                     "dept_id": "003",
        //                     "dept_name": "开发",
        //                     "parent_id": "-1",
        //                     "description": "开发",
        //                     "city_code": "110000",
        //                     "parent_city_code": "100000",
        //                     "create_id": null,
        //                     "gmt_create": null,
        //                     "gmt_modified": null
        //                 },
        //                 {
        //                     "dept_id": "004",
        //                     "dept_name": "河北",
        //                     "parent_id": "-1",
        //                     "description": null,
        //                     "city_code": "130000",
        //                     "parent_city_code": "100000",
        //                     "create_id": null,
        //                     "gmt_create": null,
        //                     "gmt_modified": null
        //                 },
        //                 {
        //                     "dept_id": "005",
        //                     "dept_name": "河南",
        //                     "parent_id": "-1",
        //                     "description": null,
        //                     "city_code": "410000",
        //                     "parent_city_code": "100000",
        //                     "create_id": null,
        //                     "gmt_create": null,
        //                     "gmt_modified": null
        //                 },
        //                 {
        //                     "dept_id": "006",
        //                     "dept_name": "haha",
        //                     "parent_id": "-1",
        //                     "description": null,
        //                     "city_code": "120000",
        //                     "parent_city_code": "100000",
        //                     "create_id": null,
        //                     "gmt_create": null,
        //                     "gmt_modified": null
        //                 }
        //             ]
        //         }
        //     ]
        // });
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
    consoleClear({ }: SubscriptionAPI) {

        setTimeout(() => {
            console.clear();
        }, 1200);
    }
};