import { Model } from 'dva';
import reducers from './reducers'

interface DeptTreeState {
    treeData: DeptNode[]
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
 * 部门树数据
 */
let model: Model = {
    namespace: 'deptTree',
    state: {
        treeData: []
    },
    reducers
}

export { DeptNode, DeptTreeState };
export default model;