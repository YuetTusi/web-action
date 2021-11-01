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
        data: {
            // "6ea21f8fd01c3c17fc2779850d212b34": {
            //     "涉黄": {
            //         "lastLogin": "无数据",
            //         "isReg": 0
            //     },
            //     "传销": {
            //         "ParticipatingWebsiteCount": "N",
            //         "lastLogin": "无数据",
            //         "regTime": "1",
            //         "isReg": 0,
            //         "haveBindBankCard": "N"
            //     },
            //     "涉赌": {
            //         "lastLogin": "无数据",
            //         "participatingFunds": "0",
            //         "isAgent": "N",
            //         "isReg": 0,
            //         "participatingWebsiteCount": "N",
            //         "haveBindBankCard": "N"
            //     }
            // },
            // "197a25cd11a4cd3f49e92069e0bb2208": {
            //     "涉黄": {
            //         "lastLogin": "无数据",
            //         "isReg": 0
            //     },
            //     "传销": {
            //         "ParticipatingWebsiteCount": "N",
            //         "lastLogin": "无数据",
            //         "regTime": "1",
            //         "isReg": 0,
            //         "haveBindBankCard": "N"
            //     },
            //     "涉赌": {
            //         "lastLogin": "无数据",
            //         "participatingFunds": "0",
            //         "isAgent": "N",
            //         "isReg": 0,
            //         "participatingWebsiteCount": "N",
            //         "haveBindBankCard": "N"
            //     }
            // },
            // "841b2f6f36c367dbe88c1eb2403873b0": {
            //     "涉黄": {
            //         "lastLogin": "无数据",
            //         "isReg": 0
            //     },
            //     "传销": {
            //         "ParticipatingWebsiteCount": "N",
            //         "lastLogin": "无数据",
            //         "regTime": "1",
            //         "isReg": 0,
            //         "haveBindBankCard": "N"
            //     },
            //     "涉赌": {
            //         "lastLogin": "无数据",
            //         "participatingFunds": "0",
            //         "isAgent": "N",
            //         "isReg": 0,
            //         "participatingWebsiteCount": "N",
            //         "haveBindBankCard": "N"
            //     }
            // },
            // "a4e26368c53208ec1dff1d972fab4828": {
            //     "涉黄": {
            //         "lastLogin": "无数据",
            //         "isReg": 0
            //     },
            //     "传销": {
            //         "ParticipatingWebsiteCount": "N",
            //         "lastLogin": "无数据",
            //         "regTime": "1",
            //         "isReg": 0,
            //         "haveBindBankCard": "N"
            //     },
            //     "涉赌": {
            //         "lastLogin": "无数据",
            //         "participatingFunds": "0",
            //         "isAgent": "N",
            //         "isReg": 0,
            //         "participatingWebsiteCount": "N",
            //         "haveBindBankCard": "N"
            //     }
            // }
        },
        pageIndex: 1,
        pageSize: PAGESIZE,
        loading: false
    },
    reducers,
    effects
};

export { BatchState, BatchDataSource };
export default model;