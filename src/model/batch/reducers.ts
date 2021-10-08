import { AnyAction } from "redux";
import { BatchState } from ".";

export default {

    setPageIndex(state: BatchState, { payload }: AnyAction) {
        state.pageIndex = payload;
        return state;
    },
    setData(state: BatchState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    },
    setLoading(state: BatchState, { payload }: AnyAction) {
        state.loading = payload;
        return state;
    }
};