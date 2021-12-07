import { AnyAction } from 'redux';
import { AppLogState } from ".";

export default {

    /**
     * 设置分页
     */
    setPage(state: AppLogState, { payload }: AnyAction) {
        state.pageIndex = payload.pageIndex;
        state.pageSize = payload.pageSize;
        state.total = payload.total;
        return state;
    },
    /**
     * 设置读取中状态
     */
    setLoading(state: AppLogState, { payload }: AnyAction) {
        state.loading = payload;
        return state;
    },
    /**
     * 设置数据
     */
    setData(state: AppLogState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    }
}