import { Model } from 'dva';
import effects from './effects';
import reducers from './reducers';
import { PAGESIZE } from '@/utility/helper';
import { SearchLogEntity } from '@/schema/search-log-entity';

interface AppLogState {
    /**
     * 数据
     */
    data: SearchLogEntity[],
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

let model: Model = {
    namespace: 'appLog',
    state: {
        pageIndex: 1,
        pageSize: PAGESIZE,
        total: 0,
        loading: false,
        data: []
    },
    reducers,
    effects
}

export { AppLogState };
export default model;