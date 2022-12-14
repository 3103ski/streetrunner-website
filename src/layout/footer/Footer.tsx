// React
import { Link } from 'react-router-dom';

// ==> Packages
import { Row, Col } from 'antd';

// ==> Project Imports
import { SocialButtons } from 'components';
import routes from 'routes';
import { Logo192 } from 'assets';

// Component
import Style from './footer.module.scss';

interface FooterProps {
	color?: 'opaq' | 'solid';
}

const Footer = ({ color = 'opaq' }: FooterProps) => {
	return (
		<Row justify={'center'} align='middle' className={Style.FooterWrapper}>
			<Col span={24}>
				<Row justify={'center'} align='middle' className={Style.FooterInner} data-color={color}>
					<div className={Style.OverlayColor} />
					<Col span={18}>
						<Row justify={'center'} align='middle'>
							<Col span={18} className={Style.FooterLeft}>
								<Link to={routes.HOME}>
									<img className={Style.Logo} alt='footer logo home link' src={Logo192} />
								</Link>
								<div>
									<div className={Style.Links}>
										<Link to={routes.DISCOGRAPHY}>VIDEOS</Link>
										<Link to={routes.DISCOGRAPHY}>DISCOGRAPHY</Link>
										<Link to={routes.ABOUT}>ABOUT</Link>
									</div>
									<p className={Style.Footnote}>© 2015 STREETRUNNER BEATS • All Rights Reserved</p>
								</div>
							</Col>
							<Col span={6}>
								<SocialButtons />
							</Col>
						</Row>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default Footer;
