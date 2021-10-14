import { DeptNode } from "@/model/dept-tree";
import { DataNode } from "antd/lib/tree";

const PAGESIZE = 10;

//封装工具函数
const helper = {
    /**
     * @description 是否是null或undefined
     * @param val 任意值
     */
    isNullOrUndefined(val: any): boolean {
        if (Object.prototype.toString.call(val) === '[object Undefined]' ||
            Object.prototype.toString.call(val) === '[object Null]') {
            return true;
        } else {
            return false;
        }
    },
    getDeptTree(data: DeptNode[]): DataNode[] {
        if (data && data.length > 0) {
            return data.map((item) => {
                return {
                    title: item.dept_name,
                    key: item.dept_id,
                    dept_id: item.dept_id,
                    dept_name: item.dept_name,
                    description: item.description,
                    parent_id: item.parent_id,
                    city_code: item.city_code,
                    parent_city_code: item.parent_city_code,
                    create_id: item.create_id,
                    gmt_create: item.gmt_create,
                    gmt_modified: item.gmt_modified,
                    children: this.getDeptTree(item.childDeptInfos)
                };
            });
        } else {
            return [];
        }
    }
};

export { helper, PAGESIZE };