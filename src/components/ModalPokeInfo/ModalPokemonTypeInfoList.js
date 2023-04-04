import React, {memo, useState} from 'react'
import {Button, Card, Modal} from "react-bootstrap"
import noImage from "../../assets/icons/noImage.svg"
import ModalPokeInfo from "./ModalPokeInfo"
import Loader from "../Loader/Loader";

const ModalPokemonTypeInfoList = memo(({arr, show, onHide, isLoader, titleSearch, viewStyle}) => {
	const [modalShowPokeInfo, setModalShowPokeInfo] = useState(false)
	const [changePokemon, setChangePokemon] = useState({})
	const showModalPokemonInfo = () => setModalShowPokeInfo(true)
	const hideModalPokemonInfo = () => setModalShowPokeInfo(false)

	const changePokemonHandler = (pokemon) => {
		showModalPokemonInfo()
		setChangePokemon(pokemon)
	}
	return (
		<Modal
			show={show}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={onHide}
		>
			{changePokemon && <ModalPokeInfo
				show={modalShowPokeInfo}
				onHide={hideModalPokemonInfo}
				pokemon={changePokemon}
			/>}
			{
				isLoader
					?
					<Loader/>
					:
					<>
						<Modal.Header closeButton>
							<Modal.Title id="contained-modal-title-vcenter">
								Type Search: <b style={{color: 'red'}}>{titleSearch}</b>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<ul className={`home-content_list ${viewStyle ? 'card-line' : '' }`}>
								{
									arr?.map((item, index) => (
										<li
											className="home-content_list-item"
											key={item?.id + index}
										>
											<Card>
												<Card.Title
													className='card-number'>
													{item?.id}
												</Card.Title>
												<Card.Img
													variant="top"
													src={item?.sprites?.front_default ? item?.sprites?.front_default : noImage}/>
												<Card.Body>
													<Card.Title>
														{item?.name}
													</Card.Title>
													<Button
														variant="primary"
														onClick={() => changePokemonHandler(item)}
													>
														More info</Button>
												</Card.Body>
											</Card>
										</li>
									))
								}
							</ul>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={onHide}>Close</Button>
						</Modal.Footer>
					</>
			}
		</Modal>
	)
})

export default ModalPokemonTypeInfoList