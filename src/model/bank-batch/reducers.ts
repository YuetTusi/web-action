import { AnyAction } from 'redux';
import { BankBatchState } from '.';

export default {
    setData(state: BankBatchState, { payload }: AnyAction) {
        state.hits = payload.hits ?? 0;
        state.hit_gambling = payload.gambling ?? 0;
        state.hit_pyramid = payload.pyramid ?? 0;
        state.result = payload.result ?? {};
        return state;
    },
};