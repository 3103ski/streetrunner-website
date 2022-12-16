// React
import { useNavigate } from 'react-router-dom';

// ==> Packages
import { Row, Col, Typography } from 'antd';

// ==> Project Imports
import { BioHeaderPic, BioFooterPic } from 'assets';
import { Button, SocialButtons, InfiniteReel, Overlay } from 'components';
import routes from 'routes';
import { Footer, ScrollToTop, ContentCol } from 'layout';

// ==> Component
import Style from './about.module.scss';
const { Title } = Typography;

const AboutPage = () => {
	const navigate = useNavigate();

	return (
		<Row justify={'center'} align='middle' style={{ padding: '45px 0 ' }} className={Style.BioSection}>
			<div className={Style.HeaderPic} style={{ backgroundImage: `url(${BioHeaderPic})` }}>
				<Overlay type='light' />
			</div>

			<Col span={24} className={Style.Content}>
				<ContentCol>
					<Title level={1}>STREETRUNNER</Title>
					<p className={Style.BodyLarge}>
						Nicholas Warwar, professionally known as STREETRUNNER, is an American, Grammy Award winning,
						multi-platinum record producer from Miami, Florida who currently resides in Atlanta, Georgia.
					</p>

					<p className={Style.BodySmall}>
						He began his music career as a DJ and gained recognition as a producer in 2004 with the
						Billboard charting hit single “Take Me Home” by Terror Squad. He has since become a major
						fixture as a high-profile hip-hop producer, working with artists such as Lil Wayne, Eminem, Jay
						Z, Fat Joe, Fabolous, The Game, Meek Mill, 2 Chainz, Rick Ross, Big Sean, DJ Khaled and many
						others. STREETRUNNER is a 9x Grammy Nominated Producer and has won three awards for Rap Album of
						the year (Lil Wayne- Tha Carter III 2008), Rap Album of the year (Eminem- Marshall Mathers LP 2
						2015), Best Rap Sung Performance (DJ Khaled “Higher” featuring Nipsey Hussle & John Legend
						2019).
					</p>
					<Row>
						<Col xs={24} md={9}>
							<div className={Style.ButtonWrapper}>
								<Button fluid bottomSpace='md' onClick={() => navigate(routes.DISCOGRAPHY)}>
									Discography
								</Button>
								<Button fluid bottomSpace='lg' type='secondary'>
									Videos
								</Button>
								<SocialButtons />
							</div>
						</Col>
					</Row>
				</ContentCol>
			</Col>

			{/* These items are fixed to the bottom; ".Content" styling makes space for them in layout with marginbottom. */}
			<div className={Style.BottomContainer}>
				<InfiniteReel />
				<Footer color='solid' />
			</div>
			<div className={Style.FooterPic} style={{ backgroundImage: `url(${BioFooterPic})` }}>
				<Overlay />
			</div>

			<ScrollToTop />
		</Row>
	);
};

export default AboutPage;
