// React
import * as React from 'react';

// Packages
import { Collapse } from 'antd';

// Project Imports
import { Card, SongListItem } from 'components';
import { audioAPI } from 'apis/audioAPI';
import { Song, AudioPanelCollection } from 'types';

const { Panel } = Collapse;

const AwardsAndNominationsSection = () => {
	const [panels, setPanels] = React.useState<AudioPanelCollection | null>(null);

	async function fetchSongs() {
		let data = await audioAPI.fetchSongs('&isNominated=true');
		let { songs } = data;

		if (songs) {
			let parsedPanels = await Card.parsePanelsByYear(songs);
			if (parsedPanels) setPanels(parsedPanels);
		}
	}

	React.useEffect(() => {
		if (!panels) fetchSongs();
	}, [panels]);

	return (
		<Card title='AWARDS & NOMINATIONS'>
			<Collapse accordion>
				{panels &&
					Object.keys(panels).length > 0 &&
					Object.entries(panels).map((panel: any) => {
						return (
							<Panel header={panel[0]} key={`${Math.random()}`}>
								{panel[1].map((song: Song) => {
									return (
										<SongListItem
											key={song._id}
											song={song}
											title={`${song.nominatedStatus} • ${song.nominatedFor}`}
											subtitle={`"${song.title}" by ${song.artist}`}
										/>
									);
								})}
							</Panel>
						);
					})}
			</Collapse>
		</Card>
	);
};

export default AwardsAndNominationsSection;
