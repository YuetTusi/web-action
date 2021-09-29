import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { createHashHistory as createHistory } from 'history';
import dva from 'dva';
import immer from 'dva-immer';
import createRouter from '@/router/index';
import server from '@/utility/tcp-server';
import receiveModel from '@/model/receive';
import loginModel from '@/model/login';
import 'antd/dist/antd.less';

dayjs.locale('zh-cn');

server.listen(65000, () => {
	console.log(`TCP服务已启动在端口${65000}`);
});

const app = dva({ history: createHistory() });

app.use(immer());
app.model(receiveModel);
app.model(loginModel);
app.router(createRouter);
app.start('#root');
