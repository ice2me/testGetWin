import {
	Route,
	Routes
} from "react-router-dom"
import {APP_ROUTE} from "./utils/constants"
import Home from "./views/Home/Home"
import {useGetPokesMutation, useGetPokesUrlMutation} from "./redux/services/pokesApi"
import {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {setPokesList} from "./redux/slices/pokesSlice"
import Loader from "./components/Loader/Loader"
import {replaceUrlHandler} from "./utils/replaseUrlHelper";

export const RoutesApp = () => {
	const [resPokesArr, setResPokesArr] = useState([])
	const [loaderManual, setLoaderManual] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [countPage, setCountPage] = useState(0)
	const [sessionsPerPage] = useState(20)
	const [getPokes, {isLoading: isGetPokesLoading}] = useGetPokesMutation()
	const [getPokesUrl, {isLoading: isGetPokesUrlLoading}] = useGetPokesUrlMutation()
	const dispatch = useDispatch()
	const isLoading =
		isGetPokesUrlLoading ||
		isGetPokesLoading ||
		loaderManual

	const getPokesListUrls = async () => {
		setLoaderManual(true)
		try {
			const {data} = await getPokesUrl({page: currentPage === 1 ? 0 : currentPage * 20 - 20, limit: sessionsPerPage})
			setCountPage(data.count)
			setResPokesArr([])
			data?.results.map(async (item) => {
				try {
					const textItemUrl = replaceUrlHandler(item?.url)
					const {data} = await getPokes(textItemUrl)
					setResPokesArr(state => {
						state = [...state, data]
						state.sort((a, b) => a.id > b.id ? 1 : -1)
						return state
					})
				} catch (e) {
					console.log(e)
				}
			})
			setLoaderManual(false)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		dispatch(setPokesList(resPokesArr))
	}, [currentPage])

	useEffect(() => {
		getPokesListUrls()
	}, [currentPage])

	return (
		<>
		{
			isLoading
				?
				<Loader />
				:
				<Routes >
					<Route
						path={APP_ROUTE.ENTRY}
						element={<Home
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							countPage={countPage}
							sessionsPerPage={sessionsPerPage}
							resPokesArr={resPokesArr}
						/>}
					/>
					<Route
						path={APP_ROUTE.DEFAULT}
						element={<Home
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							countPage={countPage}
							sessionsPerPage={sessionsPerPage}
							resPokesArr={resPokesArr}
						/>}
					/>
			</Routes >
		}
</>
	)
}