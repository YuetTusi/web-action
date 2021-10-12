import { DataNode } from "antd/lib/tree";

interface RoleProp { }

/**
 * 查询表单
 */
interface SearchFormValue {
    /**
     * 过滤项
     */
    roleName: string
}

/**
 * 编辑框
 */
interface EditModalProp {
    /**
     * 显示
     */
    visible: boolean,
    /**
     * 数据
     */
    data: DataNode[],
    /**
     * 选中的key
     */
    checkedKeys?: string[],
    /**
     * 确定
     */
    onOk: (checkedKeys: string[]) => void,
    /**
     * 取消
     */
    onCancel: () => void,
}

export { RoleProp, SearchFormValue, EditModalProp };