import { Dayjs } from "dayjs";

interface AppLogProp { }

interface InstallDetailModalProp {
    /**
     * 显示
     */
    visible: boolean,
    /**
     * 数据
     */
    data: any,
    /**
     * 查询关键字（手机号）
     */
    keyword?: string,
    /**
     * 取消Click
     */
    onCancel: () => void
}

interface FormValue {
    /**
     * 查询类型
     */
    type?: string[],
    /**
     * 查询时间
     */
    range: [Dayjs, Dayjs]
}

export { FormValue, AppLogProp, InstallDetailModalProp };