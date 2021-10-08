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
        data: [],
        pageIndex: 1,
        loading: false
    },
    reducers,
    effects
};

export { BatchState, BatchDataSource, SpecialData };
export default model;