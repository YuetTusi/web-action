import { DeptNode } from "@/model/department";
import { DataNode } from "antd/lib/tree";

interface DepartmentProp { }

interface TopFormProp {

    /**
     * 编辑数据
     */
    data: DeptNode | null,
    /**
     * 地区树
     */
    regionTree: DataNode[],
    /**
     * 是编辑操作
     */
    isEdit: boolean,
    /**
     * 是一级部门
     */
    isTop: boolean,
    /**
     * 表单校验
     */
    onValid: (data: TopFormValue, isEdit: boolean, isTop: boolean) => void,
    /**
     * 删除
     */
    onDel: (data: TopFormValue) => void
}

interface TopFormValue {
    /**
     * 部门id
     */
    dept_id: string,
    /**
     * 父级部门
     */
    parent_id: string,
    /**
     * 地区名称
     */
    dept_name: string,
    /**
     * 地区编码
     */
    city_code: string,
    /**
     * 描述
     */
    description: string
}

export { DepartmentProp, TopFormProp, TopFormValue };