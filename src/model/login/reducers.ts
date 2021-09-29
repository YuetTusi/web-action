import { AnyAction } from 'redux';
import { LoginState } from ".";

export default {

    /**
     * 设置登录中状态
     */
    setLoading(state: LoginState, { payload }: AnyAction) {
        state.loading = payload;
        return state;
    },
    /**
     * 设置用户名
     */
    setUsername(state: LoginState, { payload }: AnyAction) {
        state.username = payload;
        return state;
    }
}