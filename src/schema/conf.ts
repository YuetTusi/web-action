import { UseType } from "./use-type";

interface Conf {
    /**
     * 标题
     */
    title: string,
    /**
     * 类型（0：评估系统 1：应用查询系统）
     */
    useType: UseType,
    /**
     * 使用硬件加速
     */
    useHardwareAcceleration: boolean
}

export { Conf };