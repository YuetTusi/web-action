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
    GetSingleResult = 'get-single-result'
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