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
     * 查询内容（手机号/银行卡号）
     */
    public keyword?: string;
    /**
     * 查询结果
     */
    public result?: Record<string, any>;
}

export { SearchLogEntity };