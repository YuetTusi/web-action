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
     * 登录
     */
    Login = 'login',
    /**
     * 目标手机查询
     */
    GetSingle = 'get-single'
}

/**
 * 命令格式
 */
interface Command<T = any> {
    /**
     * Socket类型
     */
    type: SocketType;
    /**
     * 命令
     */
    cmd: CommandType;
    /**
     * 消息参数
     */
    msg: T;
}

export { SocketType, CommandType, Command };