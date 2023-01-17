import { createSlice } from "@reduxjs/toolkit";

const ParametreSlice = createSlice({
    name:'parametre',
    initialState:{
        listParametre:[],
        parametre:{},
        globalFilter:null
    },
    reducers:{
        setListParametre(state, action){
            state.listParametre = action.payload.listParametre;
        },
        setGlobalFilter(state, action){
            state.globalFilter = action.payload.globalFilter;
        }
    }
});

export const parametreActions = ParametreSlice.actions;
export default ParametreSlice;