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
        total: 3,
        loading: false,
        data: [
            {
                "query_id": "fb66590d0e0bc3ac6ec751bb12630878",
                "phone_num": "13811183285",
                "query_type": 1,
                "gmt_create": "2021-10-09 16:44:44"
            },
            {
                "query_id": "37de31b1d7e5206460c7524ab26b9816",
                "phone_num": "13811183285",
                "query_type": 1,
                "gmt_create": "2021-10-09 16:44:40"
            },
            {
                "query_id": "13c0961c0bf039b2d0960b61a8048b62",
                "phone_num": "13811183285",
                "query_type": 1,
                "gmt_create": "2021-10-09 14:47:17"
            }
        ]
    },
    reducers
}

export { SearchLogState, SearchLogData };
export default model;