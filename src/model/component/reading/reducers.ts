import { AnyAction } from 'redux';
import { ReadingState } from ".";

export default {

    /**
     * 设置读取状态
     */
    setReading(state: ReadingState, { payload }: AnyAction) {
        state.reading = payload;
        return state;
    }
};