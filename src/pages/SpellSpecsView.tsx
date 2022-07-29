import React, { memo, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SpellSpecifications } from '../types';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { BsBroadcast } from 'react-icons/bs';
import { GiBroadsword } from 'react-icons/gi';
import { RiBuilding2Fill } from 'react-icons/ri';
import axios, { AxiosError } from 'axios';

const SpellSpecsView = memo(() => {
	const param = useParams();
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
	const colorPallete2 = [
		'#f72585',
		'#3a0ca3',
		'#7209b7',
		'#4361ee',
		'#f94144',
		'#585123',
		'#736ced',
		'#affc41',
		'#679436',
	];
	const [colorState, setColorState] = useState<string>(colorPallete[Math.floor(Math.random() * 10)]);
	const [spellSpecs, setSpellSpecs] = useState<SpellSpecifications>();

	const getSpellsSpecs = async () => {
		try {
			const res = await axios.get(process.env.REACT_APP_API_URL + `/spells/${param?.id}`);
			if (res?.data) {
				setSpellSpecs(res.data);
			}
		} catch (error) {
			const errAxios = error as AxiosError;
			return errAxios?.response?.data;
		}
	};

	useEffect(() => {
		getSpellsSpecs()
	}, []);

	return (
		<div className="flex bg-white h-screen">
			<div
				className="transform transition-all duration-200 ease-in-out relative rounded-xl border max-w-2xl my-auto mx-auto items-center gap-y-16 gap-x-8 lg:max-w-5xl shadow-[2px_4px_12px_rgba(0,0,0,20%)] hover:scale-[1.01] hover:rounded hover:shadow-[2px_4px_16px_rgba(0,0,0,16%)]"
				style={{
					background: `radial-gradient(${colorState + '00'},${colorState + '50'})`,
					borderColor: colorState,
				}}
			>
				<div className="py-8 px-4">
					<button
						type="button"
						onClick={() => navigate('/')}
						className="border-[1px] p-2 absolute rounded-full right-8 flex items-center focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out shadow-[2px_4px_12px_rgba(0,0,0,8%)]"
						style={{ background: colorState + '30', borderColor: colorState }}
					>
						<MdOutlineArrowBackIosNew className="text-xl" />
					</button>
					<h2
						className="text-center w-fit mx-auto text-3xl font-extrabold tracking-tight sm:text-4xl border-b px-8 pb-4 border-b-[4px]"
						style={{ borderColor: colorState }}
					>
						{spellSpecs?.name}
					</h2>
					<div className="opacity-[70%] py-10 lg:px-20 text-center">{spellSpecs?.desc}</div>

					<div className="flex flex-wrap w-full lg:mx-[10%]">
						{/* <SpellSpecs title="Range" description={spellSpecs?.range} /> */}
						<SpellSpecs title="Material" description={spellSpecs?.material} />
						<SpellSpecs title="Duration" description={spellSpecs?.duration} />
						<SpellSpecs title="Level" description={spellSpecs?.level} />
						<SpellSpecs title="Attack Type" description={spellSpecs?.attack_type} />
						<SpellSpecs title="Damage Type" description={spellSpecs?.damage?.damage_type?.name} />
						<SpellSpecs title="Classes" description={spellSpecs?.classes?.map((c) => c?.name)} />
						<SpellSpecs title="Subclasses" description={spellSpecs?.subclasses?.map((s) => s?.name)} />
					</div>
				</div>
				<div
					className="flex flex-wrap border-t-[2px] border-t py-8 px-4 text-xs md:text-sm lg:text-lg"
					style={{ borderColor: colorState, background: colorState + '90' }}
				>
					<div className="flex mx-auto w-[90%] py-2">
						<div className="flex-auto flex flex-col items-center">
							<BsBroadcast
								className="text-5xl"
								style={{ color: colorPallete2[Math.floor(Math.random() * 9)] }}
							/>
							<div className="flex-auto items-center mt-4 justify-center text-center">
								<div className="mr-2">Range</div>
								<div className="text-gray-500">{spellSpecs?.range}</div>
							</div>
						</div>
						<div className="flex-auto flex flex-col items-center">
							<GiBroadsword
								className="text-5xl"
								style={{ color: colorPallete2[Math.floor(Math.random() * 9)] }}
							/>
							<div className="flex-auto items-center mt-4 justify-center text-center">
								<div className="mr-2">Damage type</div>
								<div className="text-gray-500">{spellSpecs?.damage?.damage_type?.name}</div>
							</div>
						</div>
						<div className="flex-auto flex flex-col items-center">
							<RiBuilding2Fill
								className="text-5xl"
								style={{ color: colorPallete2[Math.floor(Math.random() * 9)] }}
							/>
							<div className="flex-auto items-center mt-4 justify-center text-center">
								<div className="mr-2">School</div>
								<div className="text-gray-500">{spellSpecs?.school?.name}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

export default SpellSpecsView;

const SpellSpecs: React.FC<{ title: string; description?: string | number | boolean | string[] }> = ({
	title,
	description,
}) => {
	return (
		<div className="w-full md:w-1/2 lg:w-1/3 flex items-center mt-3">
			<div className="mr-2">{title}:</div>
			<div className="text-gray-500">{description}</div>
		</div>
	);
};
