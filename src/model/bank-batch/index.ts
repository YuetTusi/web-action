import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';

/**
 * 银行卡查询
 */
interface BankBatchState {

    data: Record<string, CardResult>
}

interface CardResult {
    [cardNo: string]: {
        /**
         * 是否绑定银行卡 N
         */
        haveBindBankCard: string,
        /**
         * 是否代理 N
         */
        isAgent: string,
        /**
         * 是否注册
         */
        isReg: number,
        /**
         * 最后登录
         */
        lastLogin: string,
        /**
         * 
         */
        participatingFunds: number,
        /**
         *  N
         */
        participatingWebsiteCount: string
    }
}

/**
 * 银行卡查询
 */
let model: Model = {
    namespace: 'bankBatch',
    state: {
        data: {}
    },
    reducers,
    effects
};

export { BankBatchState, CardResult };
export default model;