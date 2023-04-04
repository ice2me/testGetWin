import {createSlice} from "@reduxjs/toolkit"
import {pokesApi} from "../services/pokesApi"

const initialState = {
	urls: [],
	pokes: [],
	count: null,
	next: null,
	previous: null
}

const pokesSlice = createSlice({
	name: "pokes",
	initialState,
	reducers: {
		resetPokesList: (state, action) => {
			state.pokes = []
		},
		resetUrlsList: (state, action) => {
			state.urls = []
		},
		setPokesList: (state, action) => {
			state.pokes = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(pokesApi?.endpoints.getPokesUrl.matchFulfilled, (state, action) => {
					state.urls = action?.payload
					state.count = action?.payload.count
					state.next = action?.payload.next
					state.previous = action?.payload.previous
				}
			)
	}
})

const {
	actions,
	reducer
} = pokesSlice
export const {
	resetPokesList,
	resetUrlsList,
	setPokesList,
	setNewUrlsPokes
} = actions;
export default reducer
