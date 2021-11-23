import React, { FC } from 'react';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';

interface Prop {
	title: string;
}

const ErrorMessage: FC<Prop> = (props) => {
	return (
		<div className="error-message-root">
			<div className="warn-bg">
				<div className="err-caption" title={props.title ?? '系统暂时有些问题'}>
					<div title={props.title ?? '系统暂时有些问题'}>
						{props.title ?? '系统暂时有些问题'}
					</div>
				</div>
				<div className="err-message">
					<div className="err-info-icon">
						<InfoCircleOutlined />
					</div>
					<div className="err-info-box">
						{props.children}
						{/* <Button
							onClick={() => {
								dispatch(routerRedux.push('/'));
							}}
							type="primary">
							重新登录
						</Button> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export { ErrorMessage };
