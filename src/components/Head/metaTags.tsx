import React from 'react';

interface MetaTagsProps {
	themeColor?: string;
	language?: string;
	ogImage?: string;
}

export default class MetaTags extends React.Component<MetaTagsProps, {}> {
	render() {
		return (
			<>
				<meta
					name="language"
					content={
						this.props.language ? this.props.language : 'pt-BR'
					}
				/>
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta
					http-equiv="Content-Type"
					content="text/html;charset=utf-8"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta
					name="theme-color"
					content={
						this.props.themeColor
							? this.props.themeColor
							: '#FFFFFF'
					}
				/>
				{this.ogImage()}
			</>
		);
	}
	ogImage() {
		if (this.props.ogImage) {
			return <meta property="og:image" content={this.props.ogImage} />;
		}
		return '';
	}
}
