import path from 'path';
import { versions } from 'process';
import { writeFile } from 'fs/promises';
import { v4, V4Options } from 'uuid';
import { DeptNode } from "@/model/dept-tree";
import { DataNode } from "antd/lib/tree";

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
    getDeptTree(data: DeptNode[], disableId: string[] = []): DataNode[] {
        if (data && data.length > 0) {
            return data.map((item) => {
                return {
                    disabled: disableId.some(i => i === item.dept_id),
                    title: item.dept_name,
                    key: item.dept_id,
                    dept_id: item.dept_id,
                    dept_name: item.dept_name,
                    description: item.description,
                    parent_id: item.parent_id,
                    city_code: item.city_code,
                    parent_city_code: item.parent_city_code,
                    create_id: item.create_id,
                    gmt_create: item.gmt_create,
                    gmt_modified: item.gmt_modified,
                    children: this.getDeptTree(item.childDeptInfos)
                };
            });
        } else {
            return [];
        }
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
    }
};

export { helper, PAGESIZE };