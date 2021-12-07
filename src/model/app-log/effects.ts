import { AnyAction } from 'redux';
import { EffectsCommandMap } from "dva";
import message from 'antd/lib/message';
import { Document } from '@/schema/document';
import { Db } from '@/utility/db';
import logger from '@/utility/log';
import { PAGESIZE } from '@/utility/helper';
import { SearchLogEntity } from '@/schema/search-log-entity';

export default {

    /**
     * 查询日志数据
     */
    *queryData({ payload }: AnyAction, { all, call, put }: EffectsCommandMap) {
        const {
            condition, pageIndex, pageSize = PAGESIZE
        } = payload;
        const db = new Db(Document.AppInstallLog);
        yield put({ type: 'setLoading', payload: true });
        try {

            let param: Record<string, any> = {
                type: Document.AppInstallLog
            };
            if (condition?.type !== 'all') {
                //todo:以type为条件查询result下的type字段
                param['result.type'] = condition.type;
            }

            if (condition?.start && condition?.end) {
                param.createdAt = {
                    $gte: condition.start.toDate(),
                    $lte: condition.end.toDate()
                }
            }

            console.log(param);
            const [next, total]: [SearchLogEntity[], number] = yield all([
                call([db, 'findByPage'], param, pageIndex, pageSize, 'createdAt', -1),
                call([db, 'count'], param, pageIndex, pageSize)
            ]);
            yield put({ type: 'setData', payload: next });
            yield put({ type: 'setPage', payload: { pageIndex, pageSize, total } });
        } catch (error: any) {
            logger.error(`查询日志失败 @model/search-log/effects/queryData: ${error.message}`);
        } finally {
            yield put({ type: 'setLoading', payload: false });
        }
    },
    /**
     * 添加日志
     * @param {SearchLogEntity[]} payload 日志Entity
     */
    *insert({ payload }: AnyAction, { all }: EffectsCommandMap) {

        const db = new Db(Document.AppInstallLog);
        try {
            yield all((payload as SearchLogEntity[]).map(i => db.insert(i)));
            // yield fork([db, 'insert'], payload);
        } catch (error: any) {
            logger.error(`添加日志失败 @model/search-log/effects/insert: ${error.message}`);
        }
    },
    /**
     * 更新日志
     * @param {string} payload.id 编辑id
     * @param {SearchLogEntity} payload.data 日志Entity
     */
    *update({ payload }: AnyAction, { fork }: EffectsCommandMap) {

        const { id, data } = payload as { id: string, data: SearchLogEntity };
        const db = new Db(Document.AppInstallLog);
        try {
            yield fork([db, 'update'], { _id: id }, data);
        } catch (error: any) {
            logger.error(`更新日志失败 @model/search-log/effects/update: ${error.message}`);
        }
    },
    /**
     * 全部删除
     */
    *del({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
        const db = new Db(Document.AppInstallLog);
        try {
            yield call([db, 'remove'], {}, true);
        } catch (error: any) {
            message.destroy();
            message.warn('日志清除失败');
            logger.error(`更新日志失败 @model/search-log/effects/update: ${error.message}`);
        } finally {
            yield put({
                type: 'queryData',
                payload: {
                    condition: { type: 'all' },
                    pageIndex: 1,
                    pageSize: PAGESIZE
                }
            });
        }
    }
};