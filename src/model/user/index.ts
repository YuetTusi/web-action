import { PAGESIZE } from '@/utility/helper';
import { Model } from 'dva';
import { DeptNode } from '../department';
import reducers from './reducers';

interface UserState {
    /**
     * 数据
     */
    data: UserData[],
    /**
     * 当前页
     */
    pageIndex: number,
    /**
     * 页尺寸
     */
    pageSize: number,
    /**
     * 总数
     */
    total: number,
    /**
     * 读取中
     */
    loading: boolean
}

interface UserData {
    user_id: string,
    police_code: string,
    name: string,
    password: string,
    idcard: string,
    phonenum: string,
    email: string,
    ip: string,
    is_enabled: string,
    dept_id: string,
    create_id: string,
    dept_name: string,
    gmt_create: string,
    gmt_modified: string,
    roleIds: string[],
    role_names: string[],
    user_type: number,
    /**
     * 有效期
     */
    validate: string,
    /**
     * 可用次数
     */
    frequency_limit: number,
    query_count: number,
    last_login_time: string,
    last_query_time: string,
    remark: string
}

/**
 * 帐户管理
 */
let model: Model = {
    namespace: 'user',
    state: {
        data: [
            {
                "user_id": "934dbd4c4bf54742ba269a1e87dd471e",
                "police_code": "0000813",
                "name": "zhangchuanjie2",
                "password": null,
                "idcard": "411281198003221523",
                "phonenum": null,
                "email": null,
                "ip": null,
                "is_enabled": "0",
                "dept_id": "001",
                "create_id": "5dfcbdcb4c28493e97410d776f640910",
                "dept_name": "测试",
                "gmt_modified": "2021-10-09 10:11:03",
                "roleIds": [
                    "73a58b36c708fa123af605de12361588"
                ],
                "role_names": [
                    "试用用户"
                ],
                "gmt_create": "2021-09-10 10:37:22",
                "user_type": 1,
                "validate": "2024-09-09 23:59:59",
                "frequency_limit": 983,
                "query_count": 16,
                "last_login_time": "2021-10-09 10:11:03",
                "last_query_time": "2021-09-16 20:54:14",
                "remark": "zhangchuanjieyanshi"
            }
        ],
        pageIndex: 1,
        pageSize: PAGESIZE,
        total: 1,
        loading: false
    },
    reducers
};

export { UserState, UserData };
export default model;