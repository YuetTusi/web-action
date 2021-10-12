import { Model } from 'dva';
import reducers from './reducers';

interface WebMenuState {
    /**
     * 菜单数据
     */
    data: MenuNode[]
}

interface MenuNode {
    menu_code: string,
    parent_code: string,
    menu_name: string,
    menu_name_en: string,
    menu_url: string,
    is_leaf: number,
    is_enabled: number,
    sort: number,
    description: string | null,
    is_admin: string,
    gmt_create: string | null,
    gmt_modified: string | null,
    childMenuInfos: MenuNode[]
}

/**
 * 左侧菜单
 */
let model: Model = {
    namespace: 'webMenu',
    state: {
        data: [
            {
                "menu_code": "130",
                "parent_code": "-1",
                "menu_name": "目标查询",
                "menu_name_en": "MBCX",
                "menu_url": "/targetInquire",
                "menu_image": null,
                "is_leaf": 1,
                "is_enabled": 0,
                "sort": 1,
                "description": null,
                "is_admin": 1,
                "gmt_create": null,
                "gmt_modified": null,
                "childMenuInfos": []
            },
            {
                "menu_code": "140",
                "parent_code": "-1",
                "menu_name": "批量查询",
                "menu_name_en": "PLCX",
                "menu_url": "/batchInquire",
                "menu_image": null,
                "is_leaf": 1,
                "is_enabled": 0,
                "sort": 1,
                "description": null,
                "is_admin": 1,
                "gmt_create": null,
                "gmt_modified": null,
                "childMenuInfos": []
            },
            {
                "menu_code": "100",
                "parent_code": "-1",
                "menu_name": "管理中心",
                "menu_name_en": "GLZX",
                "menu_url": "/systemsetup",
                "menu_image": null,
                "is_leaf": 1,
                "is_enabled": 0,
                "sort": 4,
                "description": null,
                "is_admin": 1,
                "gmt_create": null,
                "gmt_modified": null,
                "childMenuInfos": [
                    {
                        "menu_code": "100001",
                        "parent_code": "100",
                        "menu_name": "账户管理",
                        "menu_name_en": "ZHGL",
                        "menu_url": "/usermanage",
                        "menu_image": null,
                        "is_leaf": 0,
                        "is_enabled": 0,
                        "sort": 1,
                        "description": null,
                        "is_admin": 1,
                        "gmt_create": null,
                        "gmt_modified": null,
                        "childMenuInfos": null
                    },
                    {
                        "menu_code": "100002",
                        "parent_code": "100",
                        "menu_name": "角色管理",
                        "menu_name_en": "JSGL",
                        "menu_url": "/rolemanage",
                        "menu_image": null,
                        "is_leaf": 0,
                        "is_enabled": 0,
                        "sort": 2,
                        "description": null,
                        "is_admin": 0,
                        "gmt_create": null,
                        "gmt_modified": null,
                        "childMenuInfos": null
                    },
                    {
                        "menu_code": "100003",
                        "parent_code": "100",
                        "menu_name": "部门管理",
                        "menu_name_en": "BMGL",
                        "menu_url": "/deptmanage",
                        "menu_image": null,
                        "is_leaf": 0,
                        "is_enabled": 0,
                        "sort": 3,
                        "description": null,
                        "is_admin": 1,
                        "gmt_create": null,
                        "gmt_modified": null,
                        "childMenuInfos": null
                    }
                ]
            },
            {
                "menu_code": "120",
                "parent_code": "-1",
                "menu_name": "日志管理",
                "menu_name_en": "RZGL",
                "menu_url": "/journalManage",
                "menu_image": null,
                "is_leaf": 1,
                "is_enabled": 0,
                "sort": 4,
                "description": null,
                "is_admin": 1,
                "gmt_create": null,
                "gmt_modified": null,
                "childMenuInfos": [
                    {
                        "menu_code": "120001",
                        "parent_code": "120",
                        "menu_name": "查询日志",
                        "menu_name_en": "CXRZ",
                        "menu_url": "/inquireJournal",
                        "menu_image": null,
                        "is_leaf": 0,
                        "is_enabled": 0,
                        "sort": 1,
                        "description": null,
                        "is_admin": 1,
                        "gmt_create": null,
                        "gmt_modified": null,
                        "childMenuInfos": null
                    },
                    {
                        "menu_code": "120002",
                        "parent_code": "120",
                        "menu_name": "操作日志",
                        "menu_name_en": "CZRZ",
                        "menu_url": "/operateJournal",
                        "menu_image": null,
                        "is_leaf": 0,
                        "is_enabled": 0,
                        "sort": 2,
                        "description": null,
                        "is_admin": 0,
                        "gmt_create": null,
                        "gmt_modified": null,
                        "childMenuInfos": null
                    }
                ]
            }
        ]
    },
    reducers
}
export { WebMenuState, MenuNode }
export default model;