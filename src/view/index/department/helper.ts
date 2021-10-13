import { DataNode } from "antd/lib/tree";
import { DeptNode, RegionNode } from "@/model/department";

const getDeptTree = (data: DeptNode[]): DataNode[] => {
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
                children: getDeptTree(item.childDeptInfos)
            };
        });
    } else {
        return [];
    }
};

const getRegionTree = (data: RegionNode[]): DataNode[] => {
    if (data && data.length > 0) {
        return data.map((item) => {
            return {
                title: item.name,
                key: item.city_code,
                children: getRegionTree(item.cityInfoList)
            };
        });
    } else {
        return [];
    }
};


export { getDeptTree, getRegionTree };