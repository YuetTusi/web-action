import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { createHashHistory as createHistory } from 'history';
import dva from 'dva';
import immer from 'dva-immer';
import readingModel from '@/model/component/reading';
import userInfoModel from '@/model/user-info';
import createRouter from '@/router/index';
import server from '@/utility/tcp-server';
import receiveModel from '@/model/receive';
import loginModel from '@/model/login';
import singleModel from '@/model/single';
import batchModel from '@/model/batch';
import bankModel from '@/model/bank';
import bankBatchModel from '@/model/bank-batch';
import 'antd/dist/antd.less';

dayjs.locale('zh-cn');

server.listen(65000, () => {
	console.log(`TCP服务已启动在端口${65000}`);
});

const app = dva({ history: createHistory() });

app.use(immer());
app.model(readingModel);
app.model(userInfoModel);
app.model(receiveModel);
app.model(loginModel);
app.model(singleModel);
app.model(batchModel);
app.model(bankModel);
app.model(bankBatchModel);
app.router(createRouter);
app.start('#root');
