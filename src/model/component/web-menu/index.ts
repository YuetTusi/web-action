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
                "menu_name": "手机号查询",
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
                "menu_name": "手机号批量查询",
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
                "menu_code": "150",
                "parent_code": "-1",
                "menu_name": "银行卡查询",
                "menu_name_en": "YHKCX",
                "menu_url": "/bank",
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
                "menu_code": "150",
                "parent_code": "-1",
                "menu_name": "银行卡批量查询",
                "menu_name_en": "YHKPLCX",
                "menu_url": "/bank-batch",
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
                "menu_code": "160",
                "parent_code": "-1",
                "menu_name": "查询日志",
                "menu_name_en": "CXRZ",
                "menu_url": "/inquireJournal",
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
                "menu_code": "170",
                "parent_code": "-1",
                "menu_name": "安装应用查询",
                "menu_name_en": "AZYY",
                "menu_url": "/installApp",
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
                "menu_code": "180",
                "parent_code": "-1",
                "menu_name": "查询日志",
                "menu_name_en": "AZYYRZ",
                "menu_url": "/appLog",
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
        ]
    },
    reducers
}
export { WebMenuState, MenuNode }
export default model;