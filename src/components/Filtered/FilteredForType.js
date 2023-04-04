import {Typeahead} from "react-bootstrap-typeahead"
import {Button} from "react-bootstrap";

const FilteredForType = ({getAllPokemonType, setSearchTypeArrValue, searchTypeArrValue}) => {
	return (
		<div className='filtered-typehead_block'>
			<Typeahead
				className='filtered-typehead_type'
				id="basic-typeahead-single"
				labelKey="searchPokemon"
				placeholder={'Enter Name Type'}
				options={getAllPokemonType}
				onChange={setSearchTypeArrValue}
				selected={searchTypeArrValue}
			/>
			<Button onClick={() => setSearchTypeArrValue([])}>
				Clear Filter Types
			</Button>
		</div>
	)
}

export default FilteredForType