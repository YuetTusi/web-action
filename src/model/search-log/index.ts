import { Model } from 'dva';
import reducers from './reducers';
import { PAGESIZE } from '@/utility/helper';

interface SearchLogState {
    /**
     * 数据
     */
    data: SearchLogData[],
    /**
     * 当前页
     */
    pageIndex: number,
    /**
     * 页尺寸
     */
    pageSize: number,
    /**
     * 总数
     */
    total: number,
    /**
     * 读取中
     */
    loading: boolean
}

interface SearchLogData {
    /**
     * ID
     */
    query_id: string,
    /**
     * 目标手机号
     */
    phone_num: string,
    /**
     * 查询类型
     */
    query_type: number,
    /**
     * 查询时间
     */
    gmt_create: string
}

let model: Model = {
    namespace: 'searchLog',
    state: {
        pageIndex: 1,
        pageSize: PAGESIZE,
        total: 0,
        loading: false,
        data: []
    },
    reducers
}

export { SearchLogState, SearchLogData };
export default model;