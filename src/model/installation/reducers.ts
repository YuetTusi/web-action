import { AnyAction } from 'redux';
import { InstallationState } from '.';

export default {

    /**
     * 更新数据
     */
    setData(state: InstallationState, { payload }: AnyAction) {
        state.data = payload;
        return state;
    },
    /**
     * 更新loading
    */
    setLoading(state: InstallationState, { payload }: AnyAction) {
        state.loading = payload;
        return state;
    }
}