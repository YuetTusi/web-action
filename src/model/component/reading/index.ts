import { Model } from 'dva';
import reducers from './reducers';

interface ReadingState {
    /**
     * 读取中
     */
    reading: boolean
}

let model: Model = {
    namespace: 'reading',
    state: {
        reading: false
    },
    reducers
}

export { ReadingState };
export default model;