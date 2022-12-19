import { Input } from 'antd';

import Style from './shared.module.scss';

interface CustomInputInterface {
	[s: string]: any;
}

const CustomInput = ({ ...rest }: CustomInputInterface) => {
	return <Input {...rest} className={Style.Input} />;
};

export default CustomInput;
