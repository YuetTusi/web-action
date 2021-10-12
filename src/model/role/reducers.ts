import { AnyAction } from 'redux';
import { RoleState } from '.';

export default {

    /**
     * 设置tree
     */
    setTree(state: RoleState, { payload }: AnyAction) {
        state.tree = payload;
        return state;
    }
};