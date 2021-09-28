import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { createHashHistory as createHistory } from 'history';
import dva from 'dva';
import immer from 'dva-immer';
import createRouter from '@/router/index';
import 'antd/dist/antd.less';


dayjs.locale('zh-cn');

const app = dva({ history: createHistory() });

app.use(immer());
app.router(createRouter);
app.start('#root');
