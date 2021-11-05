import { Model } from 'dva';
import reducers from './reducers';

interface UserInfoState {
    /**
     * 可用次数
     */
    frequency_limit: number
}

/**
 * 用户信息
 */
let model: Model = {
    namespace: 'userInfo',
    state: {
        frequency_limit: ''
    },
    reducers
}

export { UserInfoState };
export default model;