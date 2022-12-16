/**
 * A component that presents data with a title and logo or graphic behind title
 */

import Style from './card.module.scss';
import { Logo512 } from 'assets';

interface CardProps {
	title: string;
	children?: JSX.Element | JSX.Element[];
}

const Card = ({ title, children }: CardProps) => {
	return (
		<div className={Style.SegmentWrapper}>
			<div className={Style.TitleWrapper}>
				<img src={Logo512} alt='streetrunner logo' />
				<h1>{title}</h1>
			</div>
			{children}
		</div>
	);
};

export default Card;
