import { Model } from 'dva';
import reducers from './reducers';

interface UserInfoState {
    user_id: string,
    police_code: string,
    name: string,
    idcard: string,
    phonenum: string,
    is_enabled: number,
    dept_id: string,
    gmt_create: string,
    gmt_modified: string,
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
    last_query_time: string
}

/**
 * 用户信息
 */
let model: Model = {
    namespace: 'userInfo',
    state: {
        user_id: '',
        police_code: '',
        name: '',
        idcard: '',
        phonenum: '',
        is_enabled: '',
        dept_id: '',
        gmt_create: '',
        gmt_modified: '',
        validate: '',
        frequency_limit: '',
        query_count: '',
        last_login_time: '',
        last_query_time: ''
    },
    reducers
}

export { UserInfoState };
export default model;