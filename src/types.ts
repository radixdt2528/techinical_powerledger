import { Dispatch, SetStateAction } from 'react';

export interface SpellDetail {
	index: string;
	name: string;
	url: string;
}

export interface SpellSpecifications {
	attack_type: string;
	casting_time: string;
	classes: SpellDetail[];
	components: string[];
	concentration: boolean;
	damage: {
		damage_at_slot_level: Record<number, string>;
		damage_type: SpellDetail;
	};
	desc: string[];
	duration: string;
	higher_level: string[];
	index: string;
	level: number;
	material: string;
	name: string;
	range: string;
	ritual: boolean;
	school: SpellDetail;
	subclasses: SpellDetail[];
	url: string;
	_id: string;
}

export interface DndState {
	details: SpellDetail[];
	specs: SpellSpecifications;
	favoriteSpells: {}[];
}

export type Spells = Pick<DndState, 'details'>;
export type DndPerform =
	| {
			type: 'SET__DETAILS';
			payload: Spells;
	  }
	| {
			type: 'SET__FAVORITE_SPELL';
			payload: string;
	  }
	| {
			type: 'SET__SPECS';
			payload: { specs: SpellSpecifications };
	  };

export interface SpellCardProps {
	spellDetails: SpellDetail;
	isFavorite: boolean;
	dndFavState: Array<string>;
	setDndFavState: Dispatch<SetStateAction<Array<string>>>;
}

export interface TypeDndContext {
	state: DndState;
	actions: {
		setDetails: (payload: Spells) => void;
		setSpellSpecs: (payload: { specs: SpellSpecifications }) => void;
		setFavoriteSpell: (payload: string) => void;
	};
}
