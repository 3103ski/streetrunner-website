import Style from './shared.module.scss';
import { Logo512 } from 'assets';

interface HomeSegmentProps {
	title: string;
	children?: JSX.Element | JSX.Element[];
}

const HomeSegment = ({ title, children }: HomeSegmentProps) => {
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

export default HomeSegment;
