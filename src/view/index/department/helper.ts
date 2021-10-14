import { DataNode } from "antd/lib/tree";
import { RegionNode } from "@/model/department";

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


export { getRegionTree };