import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { createHashHistory as createHistory } from 'history';
import dva from 'dva';
import immer from 'dva-immer';
import readingModel from '@/model/component/reading';
import webMenuModel from '@/model/component/web-menu';
import userInfoModel from '@/model/user-info';
import createRouter from '@/router/index';
import server from '@/utility/tcp-server';
import receiveModel from '@/model/receive';
import loginModel from '@/model/login';
import singleModel from '@/model/single';
import batchModel from '@/model/batch';
import bankModel from '@/model/bank';
import bankBatchModel from '@/model/bank-batch';
import installationModel from '@/model/installation';
import searchLogModel from '@/model/search-log';
import appLogModel from '@/model/app-log';
import 'antd/dist/antd.less';

const port = 65000;

dayjs.locale('zh-cn');

server.listen(port, () => {
	console.log(`TCP服务已启动在端口${port}`);
});

const app = dva({ history: createHistory() });

app.use(immer());
app.model(readingModel);
app.model(webMenuModel);
app.model(userInfoModel);
app.model(receiveModel);
app.model(loginModel);
app.model(singleModel);
app.model(batchModel);
app.model(bankModel);
app.model(bankBatchModel);
app.model(installationModel);
app.model(searchLogModel);
app.model(appLogModel);
app.router(createRouter);
app.start('#root');
