import { AnyAction } from 'redux';
import { DeptTreeState } from '.';

export default {

    setTreeData(state: DeptTreeState, { payload }: AnyAction) {
        state.treeData = payload;
        return state;
    }
};
