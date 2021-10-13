import { AnyAction } from 'redux';
import { DepartmentState } from ".";

export default {

    /**
     * 编辑对象
     */
    setEditDept(state: DepartmentState, { payload }: AnyAction) {
        state.editDept = payload;
        return state;
    },
    /**
     * 部门树
     */
    setTree(state: DepartmentState, { payload }: AnyAction) {
        state.tree = payload;
        return state;
    },
    /**
     * 地区树
     */
     setRegion(state: DepartmentState, { payload }: AnyAction) {
        state.region = payload;
        return state;
    },
};