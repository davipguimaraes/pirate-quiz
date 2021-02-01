import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { InputBase } from './InputProp';

export default function Input({
	onChange,
	placeholder,
	...props
}: InferProps<typeof Input.propTypes>) {
	return (
		<div>
			<InputBase
				placeholder={placeholder}
				onChange={onChange}
				{...props}
			/>
		</div>
	);
}

Input.defaultProps = {
	value: '',
};

Input.propTypes = {
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	name: PropTypes.string,
	value: PropTypes.string,
};
