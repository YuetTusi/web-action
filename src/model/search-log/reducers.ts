import { AnyAction } from 'redux';
import { SearchLogState } from ".";

export default {

    /**
     * 设置分页
     */
    setPage(state: SearchLogState, { payload }: AnyAction) {
        state.pageIndex = payload.pageIndex;
        state.pageSize = payload.pageSize;
        state.total = payload.total;
        return state;
    },
    /**
     * 设置读取中状态
     */
    setLoading(state: SearchLogState, { payload }: AnyAction) {
        state.loading = payload;
        return state;
    },
    /**
     * 设置数据
     */
    setData(state: SearchLogState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    }
}