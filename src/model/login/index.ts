import { Model } from 'dva';
import effects from './effects';
import reducers from './reducers';

interface LoginState {
    /**
     * 用户名
     */
    username: string | null
}

let model: Model = {
    namespace: 'login',
    state: {
        username: null
    },
    reducers,
    effects
};

export { LoginState };
export default model;