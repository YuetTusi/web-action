/**
 * Socket分类
 */
enum SocketType {
    Fetch = 'fetch',
    Error = 'socket_error'
}

/**
 * 命令类型
 */
enum CommandType {
    /**
     * 
     */
    UIStart = 'ui-start',
    /**
     * 接收菜单
     */
    MenuResult = 'menu-result',
    /**
     * 查询用户信息
     */
    FindUserInfo = 'find-user-info',
    /**
     * 登录
     */
    Login = 'login',
    /**
     * 目标手机查询
     */
    GetSingle = 'get-single',
    /**
     * 目标手机查询结果
     */
    GetSingleResult = 'get-single-result',
    /**
     * 查询日志
     */
    QueryLog = 'query-log',
    /**
     * 查询日志结果
     */
    QueryLogResult = 'query-log-result',
    /**
     * 操作日志
     */
    OperationLog = 'operation-log',
    /**
     * 操作日志结果
     */
    OperationLogResult = 'operation-log-result',
    /**
     * 查询角色
     */
    QueryRole = 'query-role',
    /**
     * 查询角色结果
     */
    QueryRoleResult = 'query-role-result',
    /**
     * 更新角色菜单
     */
    UpdateRoleMenu = 'update-role-menu',
    /**
     * 更新角色菜单结果
     */
    UpdateRoleMenuResult = 'update-role-menu-result',
    /**
     * 查询部门树
     */
    QueryDeptByParent = 'query-dept-by-parent',
    /**
     * 查询部门树结果
     */
    QueryDeptByParentResult = 'query-dept-by-parent-result',
    /**
     * 地区
     */
    Region = 'region',
    /**
     * 地区结果
     */
    RegionResult = 'region-result',
    /**
     * 添加部门
     */
    AddDept = 'add-dept',
    /**
     * 添加部门结果
     */
    AddDeptResult = 'add-dept-result',
    /**
     * 更新部门
     */
    UpdateDept = 'update-dept',
    /**
     * 更新部门结果
     */
    UpdateDeptResult = 'update-dept-result',
    /**
     * 删除部门
     */
    DelDept = 'del-dept',
    /**
     * 删除部门结果
     */
    DelDeptResult = 'del-dept-result',
    /**
     * 查询帐号
     */
    QueryUserByDept = 'query-user-by-dept',
    /**
     * 查询帐号结果
     */
    QueryUserByDeptResult = 'query-user-by-dept-result',
    /**
     * 充值
     */
    Recharge = 'recharge',
    /**
     * 充值结果
     */
    RechargeResult = 'recharge-result',
    /**
     * 用户启用/禁用
     */
    UserIsEnable = 'user-is-enable',
    /**
     * 用户启用/禁用结果
     */
    UserIsEnableResult = 'user-is-enable-result',
    /**
     * 重置密码
     */
    ResetPassword = 'reset-password',
    /**
     * 重置密码结果
     */
    ResetPasswordResult = 'reset-password-result',
    /**
     * 删除用户
     */
    DelUser = 'del-user',
    /**
     * 删除用户结果
     */
    DelUserResult = 'del-user-result',
    /**
     * 添加帐户
     */
    AddUser = 'add-user',
    /**
     * 添加帐户结果
     */
    AddUserResult = 'add-user-result',
    /**
     * 编辑帐户
     */
    UpdateUser = 'update-user',
    /**
     * 编辑帐户结果
     */
    UpdateUserResult = 'update-user-result'
}

/**
 * 命令格式
 */
interface Command<T = any> {
    /**
     * 命令
     */
    cmd: CommandType;
    /**
     * 消息参数
     */
    msg: T;
}

/**
 * 后端返回结果
 */
interface Result<T = any> {
    ret: number,
    message: string,
    data: T,
}

export { SocketType, CommandType, Command, Result };