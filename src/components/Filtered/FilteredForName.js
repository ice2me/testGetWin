import {Typeahead} from "react-bootstrap-typeahead"
import {Button} from "react-bootstrap"
const FilteredForName = ({getAllPokemonName, setSearchValueArr, searchValueArr}) => {

	return (
		<div className='filtered-typehead_block'>
			<Typeahead
				className='filtered-typehead_name'
				id="basic-typeahead-single"
				labelKey="searchPokemon"
				placeholder={'Enter Name Pokemon'}
				options={getAllPokemonName}
				onChange={setSearchValueArr}
				selected={searchValueArr}
			/>
			<Button onClick={() => setSearchValueArr([])}>
				Clear Filter Name
			</Button>
		</div>
	)
}

export default FilteredForName