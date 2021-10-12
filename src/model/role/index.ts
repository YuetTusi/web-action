import { Model } from 'dva';
import { DataNode } from 'antd/lib/tree';
import reducers from './reducers';
import effects from './effects';
import { PAGESIZE } from '@/utility/helper';

interface RoleState {
    /**
     * 数据
     */
    data: RoleData[],
    /**
     * 当前页
     */
    pageIndex: number,
    /**
     * 页尺寸
     */
    pageSize: number,
    /**
     * 总数
     */
    total: number,
    /**
     * 读取中
     */
    loading: boolean,
    /**
     * 编辑树数据
     */
    tree: DataNode[],
    /**
     * 选中key值
     */
    checkedKeys: string[],
    /**
     * 编辑角色id
     */
    roleId: string
}

/**
 * 角色数据
 */
interface RoleData {
    /**
     * 角色id
     */
    role_id: string,
    /**
     * 角色名
     */
    role_name: string,
    /**
     * 角色类型id
     */
    role_type_id: number,
    /**
     * 
     */
    role_code: any,
    /**
     * 
     */
    is_custom: string,
    /**
     * 
     */
    create_id: any,
    /**
     * 描述
     */
    description: string,
    /**
     * 创建时间
     */
    gmt_create: string,
    /**
     * 更新时间
     */
    gmt_modified: string,
    /**
     * 角色类型名
     */
    role_type_name: string,
    /**
     * 菜单权限
     */
    menuName: string[],
    /**
     * 菜单编码
     */
    menu_code: string[]
}

let model: Model = {
    namespace: 'role',
    state: {
        pageIndex: 1,
        pageSize: PAGESIZE,
        total: 0,
        loading: false,
        data: [
            {
                "role_id": "5836601805ba8b41b0b4ebb778b30677",
                "role_name": "超级管理员",
                "role_type_id": 1,
                "role_code": null,
                "is_custom": "0",
                "create_id": null,
                "description": null,
                "gmt_create": "2021-06-25 09:30:15",
                "gmt_modified": "2021-07-08 17:05:22",
                "menu_code": [
                    "130",
                    "100001",
                    "100002",
                    "100003",
                    "100",
                    "140",
                    "120001",
                    "120002",
                    "120"
                ],
                "role_type_name": "超级管理员",
                "menuName": [
                    "目标查询",
                    "账户管理",
                    "角色管理",
                    "部门管理",
                    "管理中心",
                    "批量查询",
                    "查询日志",
                    "操作日志",
                    "日志管理"
                ]
            },
        ],
        tree: [],
        checkedKeys: [],
        roleId: ''
    },
    reducers,
    effects
}

export { RoleState, RoleData };
export default model;