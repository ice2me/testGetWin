import FilteredForName from "./FilteredForName"
import {useGetPokesMutation, useGetPokesUrlMutation} from "../../redux/services/pokesApi"
import React, {useCallback, useEffect, useState} from "react"
import {replaceUrlHandler} from "../../utils/replaseUrlHelper"
import ModalPokeInfo from "../ModalPokeInfo/ModalPokeInfo"
import FilteredForType from "./FilteredForType"
import ModalPokemonTypeInfoList from "../ModalPokeInfo/ModalPokemonTypeInfoList"
import Loader from "../Loader/Loader"
import {URL_NAME_CATEGORY} from "../../utils/constants"

const FilteredBuilder = ({countPage, viewStyle}) => {
	const [getPokesUrl] = useGetPokesUrlMutation()
	const [getPokes, {isLoading: isGetPokesLoading}] = useGetPokesMutation()
	const [getAllPokemonName, setGetAllPokemonName] = useState([])
	const [allInfoPokemon, setAllInfoPokemon] = useState([])
	const [searchValueArr, setSearchValueArr] = useState([])
	const [modalShowPokeInfo, setModalShowPokeInfo] = useState(false)
	const [changePokemon, setChangePokemon] = useState({})

	const [getAllPokemonType, setGetAllPokemonType] = useState([])
	const [allPokemonTypeArr, setAllPokemonTypeArr] = useState([])
	const [searchTypeArrValue, setSearchTypeArrValue] = useState([])
	const [getResultTypeSearch, setGetResultTypeSearch] = useState([])
	const [modalShowPokeTypeInfo, setModalShowPokeTypeInfo] = useState(false)
	const [loaderManual, setLoaderManual] = useState(false)
	const isLoader = isGetPokesLoading && loaderManual
	const showModalPokemonInfo = () => setModalShowPokeInfo(true)
	const hideModalPokemonInfo = () => setModalShowPokeInfo(false)
	const showModalPokemonTypeInfo = () => setModalShowPokeTypeInfo(true)
	const hideModalPokemonTypeInfo = () => setModalShowPokeTypeInfo(false)

	const changePokemonHandler = (pokemon) => {
		showModalPokemonInfo()
		setChangePokemon(pokemon)
	}

	const pokesUrlsAll = useCallback(async () => {
		let allNames = []
		let allInfo = []
		// for (let i = 0; i <= countPage; i++) {
		for (let i = 0; i <= 10; i++) {
			const {data} = await getPokesUrl({page: i, limit: 20})
			const tehNames = data?.results.map(item => {
				allInfo.push(item)
				return item?.name
			})
			tehNames.map(item => allNames.push(item))
		}
		setAllInfoPokemon(allInfo)
		const tehSaveName = allNames.map(item => item)
		setGetAllPokemonName(tehSaveName)
	}, [])

	const searchPokemon = (name) => allInfoPokemon.filter(item => item.name === name)
	const changeSearchPokemon = searchPokemon(searchValueArr[0])

	const showSearchChangePokemon = async () => {
		const textItemUrl = replaceUrlHandler(changeSearchPokemon[0]?.url)
		const {data} = await getPokes(textItemUrl)
		changePokemonHandler(data)
	}

	useEffect(() => {
		searchValueArr.length >= 1 && showSearchChangePokemon()
	}, [searchValueArr])

	useEffect(() => {
		pokesUrlsAll()
	}, [])

	const filteredPokemonForType = async () => {
		let countTypeLength
		const arrTypeName = []
		const tehArr = []
		let tehItem = []
		const textItemUrl = replaceUrlHandler(URL_NAME_CATEGORY.GENERATION)
		const {data} = await getPokes(textItemUrl)
		countTypeLength = data.count

		for (let i = 0; i < countTypeLength; i++) {
			const textItemUrl = replaceUrlHandler(`${URL_NAME_CATEGORY.GENERATION}/${i + 1}`)
			const {data} = await getPokes(textItemUrl)
			const tehArr = data.types.map(item => {
				tehItem.push(item)
				return item.name
			})
			arrTypeName.push(tehArr)
			setAllPokemonTypeArr(tehItem)
		}

		const teh = arrTypeName.map(item => {
			return item.concat(item)
		})

		teh.map(item => {
			return item.forEach(item => {
				return tehArr.push(item)
			})
		})
		setGetAllPokemonType(tehArr)
		// changePokemonHandler(data)
	}

	const searchPokemonType = async () => {
		setLoaderManual(true)
		const arrTeh = []
		const filterTypeChangePokemon = allPokemonTypeArr.filter(item => item.name === searchTypeArrValue[0])
		const textItemUrl = replaceUrlHandler(filterTypeChangePokemon[0]?.url)
		const {data} = await getPokes(textItemUrl)

		data.pokemon.map(async item => {
			const textItemUrlItem = replaceUrlHandler(item?.pokemon?.url)
			const results = await getPokes(textItemUrlItem)
			arrTeh.push(results.data)
		})

		setGetResultTypeSearch(arrTeh)
		showModalPokemonTypeInfo()
		setLoaderManual(false)
	}



	useEffect(() => {
		searchTypeArrValue.length >= 1 && searchPokemonType()
	}, [searchTypeArrValue])


	useEffect(() => {
		filteredPokemonForType()
	}, [])

	if (isLoader) {
		return <Loader />
	}

	return (
		<div className='filtered'>
			{
				changePokemon && <ModalPokeInfo
					show={modalShowPokeInfo}
					onHide={hideModalPokemonInfo}
					pokemon={changePokemon}
					isLoader={isLoader}
				/>
			}
			{
				getResultTypeSearch && <ModalPokemonTypeInfoList
					arr={getResultTypeSearch}
					show={modalShowPokeTypeInfo}
					onHide={hideModalPokemonTypeInfo}
					isLoader={isLoader}
					titleSearch={searchTypeArrValue[0]}
					viewStyle={viewStyle}
				/>
			}
			<h1 className='filtered-title'>Filtered</h1>
			<div className="filtered-wrapper">
				<FilteredForName
					getAllPokemonName={getAllPokemonName}
					setSearchValueArr={setSearchValueArr}
					searchValueArr={searchValueArr}
				/>

				<FilteredForType
					getAllPokemonType={getAllPokemonType}
					setSearchTypeArrValue={setSearchTypeArrValue}
					searchTypeArrValue={searchTypeArrValue}
				/>
			</div>
		</div>
	)
}

export default FilteredBuilder