import { Document } from './document';
import { BaseEntity } from './base-entity';

/**
 * 查询日志Entity
 */
class SearchLogEntity extends BaseEntity {

    /**
     * 查询类型
     */
    public type?: Document;
    /**
     * 查询内容
     */
    public content?: string;
    /**
     * 查询结果
     */
    public result?: any;
}

export { SearchLogEntity };