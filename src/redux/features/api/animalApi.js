import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const animalApi = createApi({
    reducerPath : "animalApi",
    baseQuery : fetchBaseQuery({baseUrl : "http://localhost:5000/api"}),
    endpoints : (builder)=>({
        getAllAnimals : builder.query({
            query:()=> "/animal"
        }),
        createAnimal: builder.mutation({
            query: (newAnimal) => ({
                url: "/animal",
                method: "POST",
                body: newAnimal
            })
        }),
    })
})

export const { useGetAllAnimalsQuery, useCreateAnimalMutation} = animalApi;