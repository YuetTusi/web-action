import { Model } from 'dva';
import reducers from './reducers';

interface InstallationState {
    /**
     * 加载中
     */
    loading: boolean,
    /**
     * 数据
     */
    data: InstalledApp[],
    /**
     * 详情数据
     */
    detail: InstalledApp | null
}

/**
 * 安装应用数据（对应一个手机号）
 */
interface InstalledApp {
    /**
     * IMEI
     */
    ieid: string | null,
    /**
     * 手机号
     */
    pid: string | null,
    /**
     * IMSI
     */
    isid: string | null,
    /**
     * OAID
     */
    oiid: string | null,
    /**
     * 在装应用列表
     */
    appList: string,
    /**
     * 最新安装/卸载的时间
     */
    lastUpdateTimeList: string,
    /**
     * 应用包列表
     */
    apppkgList: string,
    /**
     * 应用分类
     */
    cateNameList: string,
    /**
     * 包名列表
     */
    appNameList: string,
    /**
     * 30天内最近活跃时间
     */
    lastActiveTime30List: string,
    /**
     * 30天内活跃数
     */
    activeDay30List: string,
    /**
     * 变化更新的APP
     */
    changePkgList: string,
    /**
     * 变化更新的APP 对应状态 (-1：卸载)
     */
    changePkgStatusList: string,
    /**
     * 变化更新的APP 状态变化时间，到秒
     */
    changePkgTimeList: string,
    /**
     * 型号
     */
    model: string
}

const model: Model = {
    namespace: 'installation',
    state: {
        loading: false,
        data: [],
        detail: null
    },
    reducers
}

export { InstallationState, InstalledApp };
export default model;