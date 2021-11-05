import React, { Component } from 'react';
import log from '@/utility/log';
import { ErrorMessage } from './error-message';
import { ErrorMessageRoot } from './error-styled';

interface Prop {}
interface State {
	hasError: boolean;
	err?: Error;
	errInfo?: any;
}

class ErrorBoundary extends Component<Prop, State> {
	constructor(props: Prop) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: any) {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: any) {
		log.error(`ErrorBoundary: ${error.message}`);
		log.error(`ErrorComponent: ${errorInfo}`);

		this.setState({ err: error, errInfo: errorInfo });
	}

	render() {
		if (this.state.hasError) {
			// 你可以自定义降级后的 UI 并渲染
			return (
				<ErrorMessageRoot>
					<ErrorMessage title={this.state.err?.message!}>
						<div className="err-info-scrollbox">
							<ul>
								<li>消息：{this.state.err?.message ?? ''}</li>
								<li>StackInfo：{this.state.err?.stack ?? ''}</li>
							</ul>
						</div>
					</ErrorMessage>
				</ErrorMessageRoot>
			);
		} else {
			return this.props.children;
		}
	}
}

export default ErrorBoundary;
