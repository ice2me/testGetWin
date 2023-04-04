import {Button, Card} from "react-bootstrap"
import noImage from '../../assets/icons/noImage.svg'
import {useCallback, useEffect, useState} from "react"
import ModalPokeInfo from "../../components/ModalPokeInfo/ModalPokeInfo"
import PaginationCustom from "../../components/Pagination/PaginationCustom"
import FilteredBuilder from "../../components/Filtered/FilteredBuilder"

const Home = ({currentPage, setCurrentPage, countPage, sessionsPerPage, resPokesArr}) => {
	const [modalShowPokeInfo, setModalShowPokeInfo] = useState(false)
	const [changePokemon, setChangePokemon] = useState({})
	const [viewStyle, setViewStyle] = useState(true)
	const viewToggle = () => {
		setViewStyle(!viewStyle)
		localStorage.setItem('view', JSON.stringify({'view': !viewStyle}))
	}
	const showModalPokemonInfo = () => setModalShowPokeInfo(true)
	const hideModalPokemonInfo= () => setModalShowPokeInfo(false)

	const changePokemonHandler = (pokemon) => {
		showModalPokemonInfo()
		setChangePokemon(pokemon)
	}

	const getLocalStorageViewOption = useCallback(() => {
		const teh = JSON?.parse(localStorage?.getItem('view'))?.view
		setViewStyle(teh)
	}, [])

	useEffect(() => {
		getLocalStorageViewOption()
	}, [])

	return (
		<div className='home' >
			{changePokemon && <ModalPokeInfo
				show={modalShowPokeInfo}
				onHide={hideModalPokemonInfo}
				pokemon={changePokemon}
			/>}
		<h1 className='home-title' >
			Pokemon
		</h1 >
			<div className="home-content" >
				<FilteredBuilder countPage={countPage} viewStyle={viewStyle}/>
				<ul className={`home-content_list ${viewStyle ? 'card-line' : ''}`} >
					{
						resPokesArr?.map((item, index) => (
							<li
								className="home-content_list-item"
								key={item?.id + index}
								>
								<Card >
									<Card.Title
										className='card-number' >
										{item?.id}
									</Card.Title >
						      <Card.Img
							      variant="top"
							      src={item?.sprites?.front_default ? item?.sprites?.front_default : noImage} />
						      <Card.Body >
						        <Card.Title >
							        {item?.name}
						        </Card.Title >
						        <Button
							        variant="primary"
							        onClick={() => changePokemonHandler(item)}
						        >
							        More info</Button >
						      </Card.Body >
		            </Card >
							</li >
						))
					}
					</ul >
			</div >
				<PaginationCustom
					itemsCount={countPage}
					itemsPerPage={sessionsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					alwaysShown={true}
				/>
			<Button onClick={viewToggle}>
				Show: {viewStyle ? 'List' : 'Block' }
			</Button>
  </div >
	)
}

export default Home