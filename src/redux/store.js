import { configureStore } from "@reduxjs/toolkit";
import { animalApi } from "./features/api/animalApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer : {
        [animalApi.reducerPath] : animalApi.reducer,
    },
    middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(animalApi.middleware)
})


setupListeners(store.dispatch)