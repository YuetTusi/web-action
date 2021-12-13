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
     * "涉及资金
     */
    participatingFunds: string,
    /** 
     * 是否代理(Y/N)
     */
    isAgent: string,
    /**
     * 是否注册
     */
    isReg: number,
    /**
     * "账号个数,
     */
    participatingWebsiteCount: string,
    /**
     * 是否绑定银行卡(Y/N)
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