import { AnyAction } from 'redux';
import { WebMenuState } from ".";

export default {

    setData(state: WebMenuState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    }
};