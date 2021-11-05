import { PAGESIZE } from '@/utility/helper';
import { Model } from 'dva';
import effects from './effects';
import reducers from './reducers';

/**
 * 批量查询
 */
interface BatchState {
    /**
     * 数据
     */
    data: Record<string, BatchDataSource>,
    /**
     * 当前页
     */
    pageIndex: number,
    /**
     * 页尺寸
     */
    pageSize: number,
    /**
     * 读取中
     */
    loading: boolean
}

/**
 * 数据源类型
 */
interface BatchDataSource {
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
    namespace: 'batch',
    state: {
        data: {},
        pageIndex: 1,
        pageSize: PAGESIZE,
        loading: false
    },
    reducers,
    effects
};

export { BatchState, BatchDataSource };
export default model;