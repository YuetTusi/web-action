import { UserData } from "@/model/user";

interface UserProp { };

interface SearchFormValue {
    /**
     * 过滤项
     */
    keyword: string,
    /**
     * 部门
     */
    fil_deptId: string,
}

interface EditFormValue extends UserData {
    /**
     * !覆盖validate类型，表单项需传Dayjs类型
     */
    validate: any,
    /**
     * 确认密码
     */
    confirm_password: string
}

/**
 * 充值Modal
 */
interface RechargeModalProp {
    /**
     * 可见
     */
    visible: boolean,
    /**
     * 确定
     */
    onOk: (data: { recharge_amount: number }) => void,
    /**
     * 取消
     */
    onCancel: () => void
}

/**
 * 充值Modal
 */
interface RechargeModalProp {
    /**
     * 可见
     */
    visible: boolean,
    /**
     * 确定
     */
    onOk: (data: { recharge_amount: number }) => void,
    /**
     * 取消
     */
    onCancel: () => void
}

/**
 * 充值Modal
 */
interface EditModalProp {
    /**
     * 可见
     */
    visible: boolean,
    /**
     * 用户数据(null为添加操作)
     */
    data: UserData | null,

    /**
     * 确定
     */
    onOk: (data: UserData) => void,
    /**
     * 取消
     */
    onCancel: () => void
}


enum ActionType {
    /**
     * 充值
     */
    Recharge,
    /**
     * 禁用
     */
    Freeze,
    /**
     * 重置密码
     */
    ResetPassword,
    /**
     * 编辑
     */
    Edit,
    /**
     * 删除
     */
    Del
}

export {
    UserProp,
    SearchFormValue,
    EditFormValue,
    ActionType,
    RechargeModalProp,
    EditModalProp
};