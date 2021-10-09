import { Model } from 'dva';
import reducers from './reducers';

/**
 * 银行卡查询
 */
let model: Model = {
    namespace: 'bankBatch',
    state: {
        hits: 0,
        hit_gambling: 0,
        hit_pyramid: 0,
        result: {}
    },
    reducers
};

export default model;