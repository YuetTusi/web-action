import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';

/**
 * 银行卡查询
 */
interface BankState {
    /**
     * 银行卡命中条数
     */
    hits: number,
    /**
     * 赌博命中条数
     */
    hit_gambling: number,
    /**
     * 传销命中条数
     */
    hit_pyramid: number,
    /**
     * 银行卡结果
     */
    result: CardResult
}

interface CardResult {
    [cardNo: string]: {
        /**
         * 赌博数据
         */
        gambling: Gambling,
        /**
         * 传销数据
         */
        pyramid: Pyramid
    }
}

/**
 * 赌博数据
 */
interface Gambling {
    hit: number,
    reg_count: number,
    balance: number,
    login_time: number,
    reg_time: number,
    is_agent: number
}

/**
 * 传销数据
 */
interface Pyramid {
    hit: number
}


/**
 * 银行卡查询
 */
let model: Model = {
    namespace: 'bank',
    state: {
        hits: 0,
        hit_gambling: 0,
        hit_pyramid: 0,
        result: {}
    },
    reducers,
    effects
};

export { BankState, Gambling, Pyramid, CardResult };
export default model;