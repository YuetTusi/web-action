import { AnyAction } from 'redux';
import { LoginState } from ".";

export default {

    setUsername(state: LoginState, { payload }: AnyAction) {
        state.username = payload;
        return state;
    }
}