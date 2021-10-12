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
    UpdateRoleMenuResult = 'update-role-menu-result'
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