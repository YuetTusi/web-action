import { Model } from 'dva';
import reducers from './reducers';
import effects from './effects';

/**
 * 批量查询
 */
interface SingleState {
    /**
     * 数据
     */
    data: Record<string, SingleDataSource>
}

/**
 * 数据源类型
 */
interface SingleDataSource {
    /**
     * 最后登录 "lastLogin": 0,
     */
    lastLogin: number,
    /**
     * "participatingFunds": "0",
     */
    participatingFunds: string,
    /** 
     * 是否代理"isAgent": "N",
     */
    isAgent: string,
    /**
     * 是否注册 "isReg": 1,
     */
    isReg: number,
    /**
     * "participatingWebsiteCount": "2",
     */
    participatingWebsiteCount: string,
    /**
     * haveBindBankCard "Y"
     */
    haveBindBankCard: string,
    [others: string]: any
}



let model: Model = {
    namespace: 'single',
    state: {
        data: {},
    },
    reducers,
    effects
};

export { SingleState, SingleDataSource };
export default model;