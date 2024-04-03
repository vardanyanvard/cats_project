import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { constants } from "../../assets/constants";
import _ from "lodash";

export const getCategoriesAsync = createAsyncThunk("cats/getCategoriesAsync", async () => {
    const res = await fetch(constants.API_URL + "/categories");
    if (!res.ok) throw new Error("Invalid Request");
    const data = res.json();
    return data;
});

export const getCtasByIdAsync = createAsyncThunk("cats/getCtasByIdAsync", async ({ page, categoriId }) => {
    const res = await fetch(constants.API_URL + `/images/search?limit=10&page=${page}&category_ids=${categoriId}`);
    if (!res.ok) throw new Error("Invalid Request");
    const data = res.json();
    return data;
});

const initialState = {
    mainLoading: false,
    categoriesError: "",
    categoriesList: [],
    catsList: [],
    page: 1,
};
const catsSlice = createSlice({
    name: "cats",
    initialState,
    reducers: {
        resetCatsListRedux(state) {
            state.catsList = [];
            state.page = 1;
        },
        changePageRedux(state) {
            state.page = state.page + 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesAsync.pending, (state) => {
                state.mainLoading = true;
            })
            .addCase(getCategoriesAsync.fulfilled, (state, action) => {
                state.mainLoading = false;
                state.categoriesList = action.payload;
            })
            .addCase(getCategoriesAsync.rejected, (state, action) => {
                state.mainLoading = false;
                state.categoriesError = action.error.message;
            })
            .addCase(getCtasByIdAsync.pending, (state) => {
                state.mainLoading = true;
            })
            .addCase(getCtasByIdAsync.fulfilled, (state, action) => {
                state.mainLoading = false;
                const list = _.cloneDeep(state.catsList);
                state.catsList = [...list, ...action.payload];
            })
            .addCase(getCtasByIdAsync.rejected, (state, action) => {
                state.mainLoading = false;
            });
    },
});

export const { resetCatsListRedux, changePageRedux } = catsSlice.actions;
export default catsSlice.reducer;
