enum SocketType {
    Fetch = 'fetch',
    Error = 'socket_error'
}

enum CommandType {
    Login = 'login'
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