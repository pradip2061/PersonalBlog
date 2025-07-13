import { createSlice } from "@reduxjs/toolkit";
import { FetchBlogCategoryThunk } from "./getblogcategoryThunk";



const fetchblogcategory = createSlice({
    name:' fetchblogcategory',
    initialState:{
        data:[],
        error:null,
        status:null
    },
    reducers:{
        setdata:(state)=>{
            state.data=[]
            state.status=null
            state.error=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(FetchBlogCategoryThunk.pending,(state)=>{
            state.status ='pending',
            state.images=""
        }).addCase(FetchBlogCategoryThunk.fulfilled,(state,action)=>{
            state.status ='success'
            state.data=action.payload
        }).addCase(FetchBlogCategoryThunk.rejected,(state)=>{
            state.status ='failed'
        })
    }
})

export const {setdata} = fetchblogcategory.actions
export  default  fetchblogcategory.reducer