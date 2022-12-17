// ==> React
import React from 'react';

// ==> Project Imports
import { updateObj } from '../util';

/** Props that can be passed into useForm hook */
interface UseFormProps {
	callback: Function;
	initialState: object;
}

export default function useForm({ callback, initialState }: UseFormProps) {
	/** Keeps track of the form values */
	const [values, setValues] = React.useState<object>(initialState);

	/** Handles change to values onChange of an input */
	const onChange = (e: any) => {
		const valueUpdate = updateObj(values, { [e.target.name]: e.target.value });
		setValues(valueUpdate);
	};

	/** Submits the form using the callback provided */
	const onSubmit = (e: any) => {
		e.preventDefault();
		callback();
	};

	/**
	 * RESETTING FORM
	 * AntDesign provides a Form component that should be wrapping the form UI. It comes with a hook;
	 *
	 * const [form] = Form.useForm() <== Form instance
	 * then pass instance into the form prop of Form wrapper.
	 * then to reset form, use form.setFieldsValue(initialState);
	 *
	 * This hook will probably be replaced around project if AntDesign meets the form needs. Use
	 * Form.useForm() hook when possible.
	 */

	return {
		values,
		onChange,
		onSubmit,
	};
}
