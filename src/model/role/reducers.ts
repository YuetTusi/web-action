import { AnyAction } from 'redux';
import { RoleState } from '.';

export default {

    /**
     * 设置tree
     */
    setTree(state: RoleState, { payload }: AnyAction) {
        state.tree = payload;
        return state;
    },
    /**
     * 选中key
     */
    setCheckedKeys(state: RoleState, { payload }: AnyAction) {
        state.checkedKeys = payload;
        return state;
    },
    /**
     * 编辑角色id
     */
    setRoleId(state: RoleState, { payload }: AnyAction) {
        state.roleId = payload;
        return state;
    }
};