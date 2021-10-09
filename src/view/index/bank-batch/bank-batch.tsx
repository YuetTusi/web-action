import React, { FC } from 'react';
import { useSelector } from 'dva';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import { BankState } from '@/model/bank';

const { Item, useForm } = Form;

const BankBatch: FC<{}> = () => {
	const bankBatchState = useSelector<any, BankState>((state) => state.bankBatch);

	const [formRef] = useForm();

	return (
		<RootPanel>
			<PadBox>
				<Form form={formRef} layout="inline">
					<Item name="tempFilePath" label="选择模板">
						<Input readOnly={true} style={{ width: '260px' }} />
					</Item>
					<Item>
						<Button type="primary">
							<SearchOutlined />
							<span>查询</span>
						</Button>
					</Item>
					{/* <Item>
						<Button onClick={downloadClick} type="default">
							<DownloadOutlined />
							<span>下载模板</span>
						</Button>
					</Item> */}
				</Form>
			</PadBox>
		</RootPanel>
	);
};

export default BankBatch;
