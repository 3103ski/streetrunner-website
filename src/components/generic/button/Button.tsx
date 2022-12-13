import { Button as AntBtn } from 'antd';
import Style from './button.module.scss';

interface ButtonProps {
	text?: string | null;
	fluid?: boolean;
	[x: string]: any;
	children?: JSX.Element | JSX.Element[];
}

const Button = ({ text = null, fluid = false, children, ...rest }: ButtonProps) => {
	return (
		<AntBtn type='primary' className={Style.Button} data-fluid={fluid ? 1 : 0} {...rest}>
			{text ? text : children}
		</AntBtn>
	);
};

export default Button;
