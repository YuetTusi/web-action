import memoize from 'lodash/memoize';
import yaml from 'js-yaml';
import md5 from 'md5';
import { v4, V4Options } from 'uuid';
import os from 'os';
import { readFileSync, accessSync } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { versions } from 'process';
import { writeFile } from 'fs/promises';
import { OnlyNumber, BankCardNumber, Br } from './regex';
import { Conf } from '@/schema/conf';
import log from './log';

const KEY = 'az'; //密钥
const cwd = process.cwd();
const PAGESIZE = 10;

//封装工具函数
const helper = {
    /**
     * @description 是否是null或undefined
     * @param val 任意值
     */
    isNullOrUndefined(val: any): boolean {
        if (Object.prototype.toString.call(val) === '[object Undefined]' ||
            Object.prototype.toString.call(val) === '[object Null]') {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 生成id
     */
    newId(option?: V4Options) {
        return v4(option).replace(/-/g, '');
    },
    /**
     * 写入版本信息
     */
    async writeVersion() {
        const version = Object.entries(versions).reduce((acc, [k, v]) => {
            acc += `${k}:${v}\r\n`;
            return acc;
        }, '');
        try {
            await writeFile(path.join(cwd, './app.version'), version);
            return true;
        } catch (error) {
            throw error;
        }
    },
    /**
     * 验证手机号列表格式
     * @param list 手机号列表
     * @returns 返回[errorList,mobileList]，若errorList长度为0则验证通过
     */
    validateMobileList(list: string[]): [string[], Array<{ md5: string; value: string }>] {
        let unique = [...new Set(list)]; //去重
        let errorList: string[] = [];
        let mobileList: Array<{ md5: string; value: string }> = [];

        for (let i = 0; i < unique.length; i++) {
            if (unique[i].trim() === '') {
                continue;
            } else if (OnlyNumber.test(unique[i].trim())) {
                mobileList.push({ md5: md5(unique[i].replace(Br, '')), value: unique[i].replace(Br, '') });
            } else {
                errorList.push(unique[i]);
            }
        }
        return [errorList, mobileList];
    },
    /**
     * 验证银行卡号列表格式
     * @param list 手机号列表
     * @returns 返回[errorList,mobileList]，若errorList长度为0则验证通过
     */
    validateCardList(list: string[]): [string[], Array<{ md5: string; value: string }>] {
        let unique = [...new Set(list)]; //去重
        let errorList: string[] = [];
        let cardList: Array<{ md5: string, value: string }> = [];

        for (let i = 0; i < unique.length; i++) {
            if (unique[i].trim() === '') {
                continue;
            } else if (BankCardNumber.test(unique[i].trim())) {
                cardList.push({ md5: md5(unique[i].replace(Br, '')), value: unique[i].replace(Br, '') });
            } else {
                errorList.push(unique[i]);
            }
        }
        return [errorList, cardList];
    },
    /**
     * 读取配置文件
     * @param algo 解密算法（默认rc4）
     */
    readConf: memoize((algo: string = 'rc4'): Conf | null => {
        const isDev = process.env['NODE_ENV'];
        if (isDev === 'development') {
            let confPath = path.join(cwd, './src/config/ui.yaml');
            let chunk = readFileSync(confPath, 'utf8');
            return yaml.load(chunk) as Conf;
        } else {
            let confPath = path.join(cwd, 'resources/config/conf');
            try {
                accessSync(confPath);
                let chunk = readFileSync(confPath, 'utf8');
                const decipher = crypto.createDecipher(algo, KEY);
                let conf = decipher.update(chunk, 'hex', 'utf8');
                conf += decipher.final('utf8');
                return yaml.load(conf) as Conf;
            } catch (error: any) {
                log.error(`读取配置文件失败 @utility/helper/readConf() : ${error.message}`)
                return null;
            }
        }
    }),
    isWin7() {
        return process.platform === 'win32' && os.release().startsWith('6.1');
    },
    /**
     * 是否注册文本
     * @param val 
     */
    getIsRegText(val: any) {
        let text: string = '';
        if (this.isNullOrUndefined(val)) {
            text = '--';
            return text;
        }
        switch (val) {
            case 0:
            case '0':
                text = '未注册'
                break;
            case 1:
            case '1':
                text = '已注册'
                break;
            default:
                text = val;
        }
        return text;
    },
    /**
     * 是否代理文本
     * @param val 值
     */
    getIsAgentText(val: any) {
        let text: string = '';
        if (this.isNullOrUndefined(val)) {
            text = '--';
            return text;
        }
        switch (val) {
            case 'N':
                text = '否'
                break;
            case 'Y':
                text = '是'
                break;
            default:
                text = val;
        }
        return text;
    },
    /**
     * 得到登录信息文本
     * @param val 值
     */
    getLastLoginText(val: any) {
        let text: string = '';
        if (this.isNullOrUndefined(val)) {
            text = '--';
            return text;
        }
        switch (val) {
            case 0:
            case '0':
                text = '一年内未登录'
                break;
            case 1:
            case '1':
                text = '一年内登录过'
                break;
            case 2:
            case '2':
                text = '半年内登录过'
                break;
            case 3:
            case '3':
                text = '四个月内登录过'
                break;
            case 4:
            case '4':
                text = '一个月内登录过'
                break;
            default:
                text = val;
        }
        return text;
    },
    /**
     * 注册数量文本
     * @param val 值
     */
    getParticipatingWebsiteCountText(val: any) {
        let text: string = '';
        if (this.isNullOrUndefined(val)) {
            text = '--';
            return text;
        }
        switch (val) {
            case 'N':
                text = '未注册'
                break;
            case 1:
            case '1':
                text = '注册1个'
                break;
            case 2:
            case '2':
                text = '注册1个以上'
                break;
            default:
                text = val;
        }
        return text;
    },
    /**
     * 绑定银行卡文本
     * @param val 值
     */
    getHaveBindBankCardText(val: any) {
        let text: string = '';
        if (this.isNullOrUndefined(val)) {
            text = '--';
            return text;
        }
        switch (val) {
            case 'N':
                text = '否'
                break;
            case 'Y':
                text = '是'
                break;
            default:
                text = val;
        }
        return text;
    },
    /**
     * 注册时间文本
     * @param val 值
     */
    getRegTimeText(val: any) {
        let text: string = '';
        if (this.isNullOrUndefined(val)) {
            text = '--';
            return text;
        }
        switch (val) {
            case 1:
            case '1':
                text = '一年外注册过'
                break;
            case 2:
            case '2':
                text = '四个月内注册过'
                break;
            case 3:
            case '3':
                text = '一年内注册过'
                break;
            default:
                text = val;
        }
        return text;
    },
    /**
     * 涉级资金文本
     * @param val 值
     */
    getParticipatingFunds(val: any) {
        let text: string = '';
        if (this.isNullOrUndefined(val)) {
            text = '--';
            return text;
        }
        switch (val) {
            case 0:
            case '0':
                text = '无参赌资金';
                break;
            case 1:
            case '1':
                text = '0-5000'
                break;
            case 2:
            case '2':
                text = '5000-10000'
                break;
            case 3:
            case '3':
                text = '10000以上'
                break;
            default:
                text = val;
        }
        return text;
    }
};

export { helper, PAGESIZE };