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
import { OnlyNumber, BankCardNumber } from './regex';
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
        let errorList: string[] = [];
        let mobileList: Array<{ md5: string; value: string }> = [];

        for (let i = 0; i < list.length; i++) {
            if (OnlyNumber.test(list[i].trim())) {
                mobileList.push({ md5: md5(list[i]), value: list[i] });
            } else {
                errorList.push(list[i]);
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
        let errorList: string[] = [];
        let cardList: Array<{ md5: string, value: string }> = [];

        for (let i = 0; i < list.length; i++) {
            if (BankCardNumber.test(list[i].trim())) {
                cardList.push({ md5: md5(list[i]), value: list[i] });
            } else {
                errorList.push(list[i]);
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
    }
};

export { helper, PAGESIZE };