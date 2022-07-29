import React, { Fragment, memo, useContext, useEffect, useState } from 'react';
import { SpellDetail } from '../types';
import SpellCard from '../components/SpellCard';
import axios,{AxiosError} from 'axios';

const MainView = memo(() => {
	const [dndState, setDndState] = useState<Array<SpellDetail>>();
	const [dndFavState, setDndFavState] = useState<Array<string>>([]);


	const getSpellsDetails = async () => {
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/spells`);
			if (res?.data && res.data.results) {
				setDndState(res.data.results);
			}
		} catch (error) {
			const errAxios = error as AxiosError;
			return errAxios?.response?.data;
		}
	};

	useEffect(() => {
		console.log('JSK');
		getSpellsDetails();
	}, []);

	return (
		<Fragment>
			<h3 className="text-4xl font-medium m-2 text-center">Welcome to Dungeons &amp; Dragons</h3>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto w-fit">
				{dndState?.map((spellDetails: SpellDetail) => {
					return (
						<SpellCard
							spellDetails={spellDetails}
							key={spellDetails.index}
							isFavorite={false}
							dndFavState={dndFavState}
							setDndFavState={setDndFavState}
						/>
					);
				})}
			</div>
		</Fragment>
	);
});

export default MainView;
