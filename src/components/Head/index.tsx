import React from 'react';
import Head from 'next/head';
import Favicon from './favicon';
import MetaTags from './metaTags';

interface HeadProps {
	titulo: string;
	sharedImage: string;
}

export default class HeadPage extends React.Component<HeadProps, {}> {
	render() {
		return (
			<Head>
				<title>{this.props.titulo}</title>
				<Favicon />
				<MetaTags ogImage={this.props.sharedImage} />
			</Head>
		);
	}
}
