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
    data: BatchDataSource[],
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
     * 查询时间
     */
    gmt_create: string,
    /**
     * 手机号
     */
    mobile: string,
    /**
     * 分类数据
     */
    special_data: SpecialData[]
}

/**
 * 分类数据
 */
interface SpecialData {
    /**
     * 分类
     */
    special_type: number,
    /**
     * 查询id
     */
    query_id: string,
    /**
     * 是否注册
     */
    is_reg: number,
    /**
     * 手机号
     */
    phone_num: string,
    /**
     * 其他
     */
    [others: string]: any
}


let model: Model = {
    namespace: 'batch',
    state: {
        data: [
            // {
            //     "gmt_create": "2021-10-12 15:18:12",
            //     "mobile": "13145589663",
            //     "special_data": [
            //         {
            //             "special_type": 2,
            //             "query_id": "e4513c9535cb90d57f54043583b5daa0",
            //             "is_reg": 0,
            //             "phone_num": "13145589663"
            //         },
            //         {
            //             "special_type": 3,
            //             "query_id": "e4513c9535cb90d57f54043583b5daa0",
            //             "is_reg": 0,
            //             "phone_num": "13145589663"
            //         },
            //         {
            //             "special_type": 1,
            //             "query_id": "e4513c9535cb90d57f54043583b5daa0",
            //             "is_reg": 0,
            //             "phone_num": "13145589663"
            //         }
            //     ]
            // },
            // {
            //     "gmt_create": "2021-10-12 15:18:12",
            //     "mobile": "18041523226",
            //     "special_data": [
            //         {
            //             "special_type": 2,
            //             "query_id": "e4513c9535cb90d57f54043583b5daa0",
            //             "is_reg": 0,
            //             "phone_num": "18041523226"
            //         },
            //         {
            //             "special_type": 3,
            //             "query_id": "e4513c9535cb90d57f54043583b5daa0",
            //             "is_reg": 0,
            //             "phone_num": "18041523226"
            //         },
            //         {
            //             "special_type": 1,
            //             "query_id": "e4513c9535cb90d57f54043583b5daa0",
            //             "is_reg": 0,
            //             "phone_num": "18041523226"
            //         }
            //     ]
            // },
            // {
            //     "gmt_create": "2021-10-12 15:18:12",
            //     "mobile": "18631558216",
            //     "special_data": [
            //         {
            //             "special_type": 2,
            //             "query_id": "e4513c9535cb90d57f54043583b5daa0",
            //             "is_reg": 0,
            //             "phone_num": "18631558216"
            //         },
            //         {
            //             "special_type": 3,
            //             "query_id": "e4513c9535cb90d57f54043583b5daa0",
            //             "is_reg": 0,
            //             "phone_num": "18631558216"
            //         },
            //         {
            //             "special_type": 1,
            //             "query_id": "e4513c9535cb90d57f54043583b5daa0",
            //             "is_reg": 0,
            //             "phone_num": "18631558216"
            //         }
            //     ]
            // },
            // {
            //     "gmt_create": "2021-10-12 15:18:12",
            //     "mobile": "13020097148",
            //     "special_data": [
            //         {
            //             "special_type": 2,
            //             "query_id": "e4513c9535cb90d57f54043583b5daa0",
            //             "is_reg": 0,
            //             "phone_num": "13020097148"
            //         },
            //         {
            //             "special_type": 3,
            //             "query_id": "e4513c9535cb90d57f54043583b5daa0",
            //             "is_reg": 0,
            //             "phone_num": "13020097148"
            //         },
            //         {
            //             "special_type": 1,
            //             "query_id": "e4513c9535cb90d57f54043583b5daa0",
            //             "is_reg": 0,
            //             "phone_num": "13020097148"
            //         }
            //     ]
            // }
        ],
        pageIndex: 1,
        pageSize: PAGESIZE,
        loading: false
    },
    reducers,
    effects
};

export { BatchState, BatchDataSource, SpecialData };
export default model;