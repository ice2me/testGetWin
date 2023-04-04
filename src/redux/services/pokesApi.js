import {createApi} from "@reduxjs/toolkit/query/react"
import {POKES_API} from "../../utils/constants"
import {apiBaseUrl} from "../../utils/makeUrl"
import {axiosBaseQuery} from "../../utils/axiosBaseQuery"

export const pokesApi = createApi({
	reducerPath: "pokesApi",
	baseQuery: axiosBaseQuery({
		baseUrl: apiBaseUrl
	}),
	endpoints: (builder) => ({
		getPokesUrl: builder.mutation({
			query: ({page, limit}) => ({
				url: `${POKES_API.GET_POKES}?offset=${page}&limit=${limit}`,
				method: "GET"
			})
		}),
		getPokes: builder.mutation({
			query: (pokemon) => (
				{
				url: `/${pokemon}`,
				method: "GET"
			})
		}),
	})
})

export const {
	useGetPokesUrlMutation,
	useGetPokesMutation,
} = pokesApi
