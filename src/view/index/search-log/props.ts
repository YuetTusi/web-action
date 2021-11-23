import { CaseSort } from '@/schema/common';
import { SearchLogEntity } from '@/schema/search-log-entity';
import { Dayjs } from 'dayjs';
interface SearchLogProp { }

interface FormValue {
    /**
     * 查询类型
     */
    type?: CaseSort[],
    /**
     * 查询时间
     */
    range: [Dayjs, Dayjs]
}

interface ResultModalProp {
    /**
     * 是否显示
     */
    visbile: boolean,
    /**
     * 类型
     */
    type?: CaseSort,
    /**
     * 数据
     */
    data?: Record<string, any>,
    /**
     * 点击行日志
     */
    record?: SearchLogEntity,
    /**
     * 取消handle
     */
    onCancel?: () => void
}

export { SearchLogProp, FormValue, ResultModalProp };