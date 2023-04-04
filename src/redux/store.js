import { configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE
} from "redux-persist/es/constants";
import { requestErrorLogger } from "../utils/requestErrorLogger"
import { pokesApi } from "./services/pokesApi"
import pokesSlice from "./slices/pokesSlice"
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist"

export const store= configureStore({
	reducer: {
		pokesStore: persistReducer({ key: "pokes", storage }, pokesSlice),
		[pokesApi.reducerPath]: pokesApi.reducer,
	},
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		}).concat([pokesApi.middleware]),
		requestErrorLogger
		]
})
