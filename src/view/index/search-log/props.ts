import { Dayjs } from 'dayjs';
interface SearchLogProp { }

interface FormValue {
    /**
     * 查询类型
     */
    type: string,
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
     * 数据
     */
    data?: Record<string, any>,

    /**
     * 取消handle
     */
    onCancel?: () => void
}

export { SearchLogProp, FormValue, ResultModalProp };