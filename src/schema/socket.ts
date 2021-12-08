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
     * UI启动
     */
    UIStart = 'ui-start',
    /**
     * 接收菜单
     */
    MenuResult = 'menu-result',
    /**
     * 接收用户使用次数
     */
    LimitResult = 'limit-result',
    /**
     * 登录
     */
    Login = 'login',
    /**
     * 登录结果
     */
    LoginResult = 'login-result',
    /**
     * 目标手机查询
     */
    GetSingle = 'get-single',
    /**
     * 目标手机查询结果
     */
    GetSingleResult = 'get-single-result',
    /**
     * 批量查询
     */
    GetMultiple = 'get-multiple',
    /**
     * 批量查询结果
     */
    GetMultipleResult = 'get-multiple-result',
    /**
     * 银行卡查询
     */
    Bank = 'bank',
    /**
     * 银行卡查询结果
     */
    BankResult = 'bank-result',
    /**
     * 银行卡批量查询
     */
    BankBatch = 'bank-batch',
    /**
     * 银行卡批量查询结果
     */
    BankBatchResult = 'bank-batch-result',
    /**
     * 查询安装应用
     */
    Installation = 'installation',
    /**
     * 查询安装应用结果
     */
    InstallationResult = 'installation-result',
    /**
     * 查询日志
     */
    QueryLog = 'query-log',
    /**
     * 查询日志结果
     */
    QueryLogResult = 'query-log-result',
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
    /**
     * 表名
     */
    table?: string;
    /**
     * 其他数据
     */
    [extraName: string]: any
}

/**
 * 后端返回结果
 */
interface Result<T = any> {
    ret: number,
    message: string,
    data: T,
}

/**
 * 接口响应结果
 */
interface Res<T = any> {
    /**
     * HTTP状态码
     */
    code: number,
    /**
     * 消息
     */
    message: string,
    /**
     * 数据
     */
    data: T,
}

export { SocketType, CommandType, Command, Result, Res };