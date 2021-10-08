import { AnyAction } from 'redux';
import { SingleState } from '.';

export default {
    setData(state: SingleState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    },
};