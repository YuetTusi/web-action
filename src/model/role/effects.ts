import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { DataNode } from 'antd/lib/tree';
import { WebMenuState } from '../component/web-menu';

export default {
    /**
     * 查找菜单数据
     */
    *fetchMenu({ }: AnyAction, { select, put }: EffectsCommandMap) {

        const { data }: WebMenuState = yield select((state: any) => state.webMenu);
        const next = data.reduce((ac: DataNode[], current) => {
            ac.push({
                title: current.menu_name,
                key: current.menu_code,
                children: current.childMenuInfos.map<DataNode>(item => ({
                    title: item.menu_name,
                    key: item.menu_code,
                    isLeaf: true
                }))
            });
            return ac;
        }, []);

        yield put({ type: 'setTree', payload: next });
    }
}