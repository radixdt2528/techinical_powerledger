import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai';
import { SpellCardProps } from '../types';

const SpellCard: React.FC<SpellCardProps> = ({ spellDetails, isFavorite, dndFavState, setDndFavState }) => {
	const navigate = useNavigate();

	const colorPallete: Array<string> = [
		'#ffcccc',
		'#ffffcc',
		'#ccffcc',
		'#ccffff',
		'#ccccff',
		'#ffccff',
		'#ffe5cc',
		'#e5ffcc',
		'#ccffe5',
		'#cce5ff',
		'#e5ccff',
		'#ffcce5',
	];
	const [colorState, setColorState] = useState<string>(colorPallete[Math.floor(Math.random() * 10)]);
	const [isfav, setIsFav] = useState<boolean>(false);

	useEffect(() => {
		for (let i = 0; i < dndFavState.length; i++) {
			if (dndFavState[i] === spellDetails.name) {
				setIsFav(true);
				break;
			}
		}
	});

	return (
		<div
			className={`mt-8 relative p-8 bg-white max-w-sm transform transition-all duration-200 ease-in-out rounded overflow-hidden shadow-[2px_4px_12px_rgba(0,0,0,20%)] hover:rounded hover:shadow-[2px_4px_16px_rgba(0,0,0,16%)] 
			hover:scale-[1.01] flex flex-col h-[200px]`}
			style={{
				background: `radial-gradient(${colorState + '00'},${colorState + '50'})`,
			}}
		>
			<div className="absolute p-2 rounded-full right-5 top-5 bg-[#fff] text-4xl shadow-[2px_4px_12px_rgba(0,0,0,4%)]">
				{!isfav ? (
					<AiOutlineStar className="" onClick={() => setDndFavState((e) => [...e, spellDetails.name])} />
				) : (
					<div className="relative">
						<AiOutlineStar className="absolute" style={{ color: colorState }} />
						<AiTwotoneStar
							style={{ color: colorState + '80' }}
							onClick={() => setDndFavState((e) => [...e, spellDetails.name])}
						/>
					</div>
				)}
			</div>
			<h5 className="text-xl font-medium">{spellDetails.name}</h5>
			<button
				type="button"
				onClick={() => navigate(spellDetails.url.substring(5))}
				className="border-[2px] mt-10 rounded-2xl p-2 px-4 w-fit hover:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
				style={{ background: colorState + '60', borderColor: colorState }}
			>
				View Details
			</button>
		</div>
	);
};

export default SpellCard;
