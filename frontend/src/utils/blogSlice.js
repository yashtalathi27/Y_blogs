import {createSlice} from '@reduxjs/toolkit'

const blogSlice=createSlice({
    name:"blog",
    initialState:JSON.parse(localStorage.getItem("blog")) || {},
    reducers:{
        addSelectedBlog(state,action){
            localStorage.setItem("blog",JSON.stringify(action.payload))
            return action.payload
        },
        removeSelectedBlog(state,action){
            localStorage.removeItem("blog");
            return action.payload
        },
        addComment(state,action){
            state.comments=[...state.comments,action.payload];
        }
    }
})

export const {addSelectedBlog,removeSelectedBlog,addComment}=blogSlice.actions
export default blogSlice.reducer