// Component Imports
import { MusicSections, LandingSection } from './sections/';
import { SongReel } from 'components';
import { Footer, ScrollToTop } from 'layout';

const HomePage = () => {
	return (
		<>
			<LandingSection />
			<SongReel />
			<MusicSections />
			<Footer />
			<ScrollToTop />
		</>
	);
};

export default HomePage;
