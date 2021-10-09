import { AnyAction } from 'redux';
import { UserInfoState } from '.';

export default {

    setData(state: UserInfoState, { payload }: AnyAction) {

        state = { ...payload };
        return state;
    }
}