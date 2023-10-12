import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import productReducer from "@/redux/features/productSlice.js"

export const store = configureStore({
    reducer: {
        product: productReducer
    }
})

export const useAppSelector = useSelector