import { configureStore } from "@reduxjs/toolkit";
import cats from "./features/catsSlice";

export const store = configureStore({
    reducer: {
        cats,
    },
});
