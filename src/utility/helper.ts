import md5 from 'md5';
import { v4, V4Options } from 'uuid';
import path from 'path';
import { versions } from 'process';
import { writeFile } from 'fs/promises';
import { OnlyNumber, BankCardNumber } from './regex';

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
    }
};

export { helper, PAGESIZE };