import { Model } from 'dva';
import reducers from './reducers';

interface DepartmentState {
    /**
     * 部门树
     */
    tree: DeptNode[],
    /**
     * 地区
     */
    region: RegionNode[],
    /**
     * 编辑部门
     */
    editDept: DeptNode | null
}

/**
 * 部门结点
 */
interface DeptNode {
    dept_id: string,
    dept_name: string,
    parent_id: string,
    description: string,
    city_code: string,
    parent_city_code: string,
    create_id: string,
    gmt_create: string,
    gmt_modified: string,
    childDeptInfos: DeptNode[]
}

/**
 * 地区结点
 */
interface RegionNode {
    city_code: string,
    name: string,
    cityInfoList: RegionNode[]
}

let model: Model = {
    namespace: 'department',
    state: {
        editDept: null,
        tree: [
            // {
            //     "dept_id": "-1",
            //     "dept_name": "部门",
            //     "parent_id": null,
            //     "description": "部门地区无法选择",
            //     "city_code": "100000",
            //     "parent_city_code": null,
            //     "create_id": null,
            //     "gmt_create": null,
            //     "gmt_modified": null,
            //     "childDeptInfos": [
            //         {
            //             "dept_id": "001",
            //             "dept_name": "测试",
            //             "parent_id": "-1",
            //             "description": "",
            //             "city_code": "420000",
            //             "parent_city_code": "100000",
            //             "create_id": null,
            //             "gmt_create": null,
            //             "gmt_modified": null,
            //             "childDeptInfos": [
            //                 {
            //                     "dept_id": "001001",
            //                     "dept_name": "测试123",
            //                     "parent_id": "001",
            //                     "description": "测试部的测试小组1",
            //                     "city_code": "110100",
            //                     "parent_city_code": "420000",
            //                     "create_id": null,
            //                     "gmt_create": null,
            //                     "gmt_modified": null,
            //                     "childDeptInfos": [
            //                         {
            //                             "dept_id": "001001001",
            //                             "dept_name": "测试子部门",
            //                             "parent_id": "001001",
            //                             "description": null,
            //                             "city_code": "110116",
            //                             "parent_city_code": "110100",
            //                             "create_id": null,
            //                             "gmt_create": null,
            //                             "gmt_modified": null
            //                         }
            //                     ]
            //                 }
            //             ]
            //         },
            //         {
            //             "dept_id": "002",
            //             "dept_name": "武汉演示",
            //             "parent_id": "-1",
            //             "description": "",
            //             "city_code": "420100",
            //             "parent_city_code": "100000",
            //             "create_id": null,
            //             "gmt_create": null,
            //             "gmt_modified": null
            //         },
            //         {
            //             "dept_id": "003",
            //             "dept_name": "开发",
            //             "parent_id": "-1",
            //             "description": "开发",
            //             "city_code": "110000",
            //             "parent_city_code": "100000",
            //             "create_id": null,
            //             "gmt_create": null,
            //             "gmt_modified": null
            //         },
            //         {
            //             "dept_id": "004",
            //             "dept_name": "河北",
            //             "parent_id": "-1",
            //             "description": null,
            //             "city_code": "130000",
            //             "parent_city_code": "100000",
            //             "create_id": null,
            //             "gmt_create": null,
            //             "gmt_modified": null
            //         },
            //         {
            //             "dept_id": "005",
            //             "dept_name": "河南",
            //             "parent_id": "-1",
            //             "description": null,
            //             "city_code": "410000",
            //             "parent_city_code": "100000",
            //             "create_id": null,
            //             "gmt_create": null,
            //             "gmt_modified": null
            //         },
            //         {
            //             "dept_id": "006",
            //             "dept_name": "haha",
            //             "parent_id": "-1",
            //             "description": null,
            //             "city_code": "120000",
            //             "parent_city_code": "100000",
            //             "create_id": null,
            //             "gmt_create": null,
            //             "gmt_modified": null
            //         }
            //     ]
            // }
        ],
        region: [
            // {
            //     "city_code": "100000",
            //     "name": "中国",
            //     "cityInfoList": [
            //         {
            //             "city_code": "110000",
            //             "name": "北京(BJ)",
            //             "cityInfoList": [
            //                 {
            //                     "city_code": "110100",
            //                     "name": "北京市(BJ)",
            //                     "cityInfoList": [
            //                         {
            //                             "city_code": "110101",
            //                             "name": "东城区(DC)"
            //                         },
            //                         {
            //                             "city_code": "110102",
            //                             "name": "西城区(XC)"
            //                         },
            //                         {
            //                             "city_code": "110105",
            //                             "name": "朝阳区(CY)"
            //                         },
            //                         {
            //                             "city_code": "110106",
            //                             "name": "丰台区(FT)"
            //                         },
            //                         {
            //                             "city_code": "110107",
            //                             "name": "石景山区(SJS)"
            //                         },
            //                         {
            //                             "city_code": "110108",
            //                             "name": "海淀区(HD)"
            //                         },
            //                         {
            //                             "city_code": "110109",
            //                             "name": "门头沟区(MTG)"
            //                         },
            //                         {
            //                             "city_code": "110111",
            //                             "name": "房山区(FS)"
            //                         },
            //                         {
            //                             "city_code": "110112",
            //                             "name": "通州区(TZ)"
            //                         },
            //                         {
            //                             "city_code": "110113",
            //                             "name": "顺义区(SY)"
            //                         },
            //                         {
            //                             "city_code": "110114",
            //                             "name": "昌平区(CP)"
            //                         },
            //                         {
            //                             "city_code": "110115",
            //                             "name": "大兴区(DX)"
            //                         },
            //                         {
            //                             "city_code": "110116",
            //                             "name": "怀柔区(HR)"
            //                         },
            //                         {
            //                             "city_code": "110117",
            //                             "name": "平谷区(PG)"
            //                         },
            //                         {
            //                             "city_code": "110118",
            //                             "name": "密云区(MY)"
            //                         },
            //                         {
            //                             "city_code": "110119",
            //                             "name": "延庆区(YQ)"
            //                         },
            //                         {
            //                             "city_code": "110120",
            //                             "name": "中关村科技园区(ZGC)"
            //                         }
            //                     ]
            //                 }
            //             ]
            //         },
            //     ]
            // }
        ]
    },
    reducers
};


export { DepartmentState, DeptNode, RegionNode };
export default model;