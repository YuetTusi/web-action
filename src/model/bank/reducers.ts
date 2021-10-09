import { AnyAction } from 'redux';
import { BankState } from '.';

export default {
    setData(state: BankState, { payload }: AnyAction) {
        state.hits = payload.hits;
        state.hit_gambling = payload.gambling;
        state.hit_pyramid = payload.pyramid;
        state.result = payload.result;
        return state;
    },
};