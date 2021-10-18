import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { Db } from '@/utility/db';
import log from '@/utility/log';
import { Document } from '@/schema/document';

export default {
    /**
     * 保存历史记录
     */
    *insertHistory({ payload }: AnyAction, { fork }: EffectsCommandMap) {

        const db = new Db(Document.BankBatch);
        try {
            yield fork([db, 'insert'], payload);
        } catch (error: any) {
            log.error(`银行卡批量查询入库失败 @model/bank-batch/insertHistory:${error.message}`);
        }
    }
};