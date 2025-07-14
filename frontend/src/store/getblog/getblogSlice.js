import { createSlice } from "@reduxjs/toolkit";
import { FetchBlogThunk } from "./getblogThunk";


const fetchblog = createSlice({
    name:' fetchblogr',
    initialState:{
        projects:[],
        codingandjokes:[],
        tutorials:[],
        error:null,
        status:null
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder.addCase(FetchBlogThunk.pending,(state)=>{
            state.status ='pending',
            state.images=""
        }).addCase(FetchBlogThunk.fulfilled,(state,action)=>{
            state.status ='success'
            state.projects=action.payload.projects
              state.codingandjokes=action.payload.codingandjokes
                state.tutorials=action.payload.tutorials
        }).addCase(FetchBlogThunk.rejected,(state)=>{
            state.status ='failed'
        })
    }
})

export  default  fetchblog.reducer