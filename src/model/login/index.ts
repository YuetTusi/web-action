import { Model } from 'dva';
import effects from './effects';
import reducers from './reducers';

let model: Model = {
    namespace: 'login',
    state: {
        test: 'hello model'
    },
    reducers,
    effects
};

export default model;