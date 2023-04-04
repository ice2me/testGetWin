import React, {memo} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Loader} from "react-bootstrap-typeahead";

const ModalPokeInfo = memo(({show, pokemon, onHide, isLoader}) => {
	return (
		<Modal
			show={show}
			size="sm"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={onHide}
		>
			{
				isLoader
					?
					<Loader/>
					:
					<>
						<Modal.Header closeButton>
							<Modal.Title id="contained-modal-title-vcenter">
								{pokemon?.name}
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<img
								src={pokemon?.sprites?.front_default}
								alt={pokemon?.name}/>
							<div>
								<h4> Type:</h4>
								<ul className='mb-3'>
									{
										pokemon?.types?.map(item => <li key={item?.type?.name}
										                                className='m-1'>{item?.type?.name}</li>)
									}
								</ul>
								<h4> Stats:</h4>
								<ul className='mb-3'>
									{
										pokemon?.stats?.map(item => <li key={item?.stat?.name}
										                                className='m-1'>{item?.stat?.name}: <b>{item?.base_stat}</b></li>)
									}
								</ul>
								<h4> Abilities:</h4>
								<ul className='mb-3'>
									{
										pokemon?.abilities?.map(item => <li key={item?.ability?.name}
										                                    className='m-1'>{item?.ability?.name}</li>)
									}
								</ul>
								<h4> Moves:</h4>
								<ul className='d-flex flex-wrap modal-moves'>
									{
										pokemon?.moves?.map(item => <li key={item?.move?.name}
										                                className='m-1'>{item?.move?.name},</li>)
									}
								</ul>
							</div>

						</Modal.Body>
						<Modal.Footer>
							<Button onClick={onHide}>Close</Button>
						</Modal.Footer>
					</>
			}
		</Modal>
	)
})

export default ModalPokeInfo