import { Model } from 'dva';
import effects from './effects';
import reducers from './reducers';

interface LoginState {
    /**
     * 用户名
     */
    username: string | null,
    /**
     * 登录中
     */
    loading: boolean
}

let model: Model = {
    namespace: 'login',
    state: {
        username: null,
        loading: false
    },
    reducers,
    effects
};

export { LoginState };
export default model;