import { AnyAction } from 'redux';
import { BankBatchState } from '.';

export default {
    setData(state: BankBatchState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    },
};