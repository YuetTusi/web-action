import { AnyAction } from "redux";
import { UserState } from ".";

export default {
    /**
     * 设置分页
     */
    setPage(state: UserState, { payload }: AnyAction) {
        state.pageIndex = payload.pageIndex;
        state.pageSize = payload.pageSize;
        state.total = payload.total;
        return state;
    },
    /**
     * 设置读取中状态
     */
    setLoading(state: UserState, { payload }: AnyAction) {
        state.loading = payload;
        return state;
    },
    /**
     * 设置数据
     */
    setData(state: UserState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    },
    /**
     * 部门树
     */
    setTree(state: UserState, { payload }: AnyAction) {
        state.tree = payload;
        return state;
    },
};
