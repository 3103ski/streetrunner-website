// Component Imports
import { MusicSections, LandingSection } from './sections/';
import { Footer, ScrollToTop } from 'layout';

const HomePage = () => {
	return (
		<>
			<LandingSection />
			<MusicSections />
			<Footer />
			<ScrollToTop />
		</>
	);
};

export default HomePage;
