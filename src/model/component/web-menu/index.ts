import { Model } from 'dva';
import reducers from './reducers';
import { helper } from '@/utility/helper';
import { UseType } from '@/schema/use-type';

const { useType } = helper.readConf()!;

interface WebMenuState {
    /**
     * 菜单数据
     */
    data: MenuNode[]
}

interface MenuNode {
    menu_name: string,
    menu_url: string,
    childMenuInfos: MenuNode[]
}

let menuData: MenuNode[] = [
    {
        "menu_name": "手机号查询",
        "menu_url": "/targetInquire",
        "childMenuInfos": []
    },
    {
        "menu_name": "手机号批量查询",
        "menu_url": "/batchInquire",
        "childMenuInfos": []
    },
    {
        "menu_name": "银行卡查询",
        "menu_url": "/bank",
        "childMenuInfos": []
    },
    {
        "menu_name": "银行卡批量查询",
        "menu_url": "/bank-batch",
        "childMenuInfos": []
    }
]

switch (useType) {
    case UseType.WebAction:
        menuData = menuData.concat([{
            "menu_name": "查询日志",
            "menu_url": "/inquireJournal",
            "childMenuInfos": []
        }]);
        break;
    case UseType.AppAction:
        menuData = menuData.concat([{
            "menu_name": "安装应用查询",
            "menu_url": "/installApp",
            "childMenuInfos": []
        },
        {
            "menu_name": "查询日志",
            "menu_url": "/appLog",
            "childMenuInfos": []
        }]);
        break;
}

/**
 * 左侧菜单
 */
let model: Model = {
    namespace: 'webMenu',
    state: {
        data: menuData
    },
    reducers
}
export { WebMenuState, MenuNode }
export default model;