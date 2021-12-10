import { InstalledApp } from "@/model/installation";

interface InstallationProp { };

/**
 * 表单
 */
interface SearchForm {
    /**
     * 模板绝对路径
     */
    tempFilePath: string,
    /**
     * 类型
     */
    type: 'PHONE' | 'IMEI' | 'IMSI' | 'OAID',
    /**
     * 手机号
     */
    mobile: string
}

interface DetailModalProp {

    /**
     * 隐藏/显示
     */
    visible: boolean,
    /**
     * 详情数据
     */
    data: InstalledApp | null
}

export { InstallationProp, SearchForm, DetailModalProp };