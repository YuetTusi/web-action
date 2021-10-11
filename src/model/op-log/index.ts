import { Model } from 'dva';
import reducers from './reducers';
import { PAGESIZE } from '@/utility/helper';

interface OpLogState {
    /**
     * 数据
     */
    data: OpLogData[],
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

interface OpLogData {
    /**
     * ID
     */
    log_id: string,
    /**
     * ID
     */
    user_id: string,
    /**
     * 操作人
     */
    username: string,
    /**
     * 操作内容
     */
    operation_name: number,
    /**
     * 状态
     */
    status: number,
    /**
     * 查询时间
     */
    gmt_create: string
}

let model: Model = {
    namespace: 'opLog',
    state: {
        pageIndex: 1,
        pageSize: PAGESIZE,
        total: 3,
        loading: false,
        data: []
    },
    reducers
}

export { OpLogState, OpLogData };
export default model;