interface SearchLogProp { }

interface FormValue {
    /**
     * 过滤项
     */
    keyword: string,
    /**
     * 专题类型
     */
    special_type: string[]
}

export { SearchLogProp, FormValue };