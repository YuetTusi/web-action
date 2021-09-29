import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';
import subscriptions from './subscriptions';

let model: Model = {
    namespace: 'receive',
    state: {},
    reducers,
    effects,
    subscriptions
}

export default model;