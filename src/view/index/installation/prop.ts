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
    type: 'PHONE' | 'IMEI' | 'IMSI' | 'OAID'
}

export { InstallationProp, SearchForm };