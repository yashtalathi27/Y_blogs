import {configureStore, current} from '@reduxjs/toolkit'
import userSlice from './userSlice'
import blogSlice from './blogSlice'
import googleSlice from './googleSlice'

const store=configureStore({
    reducer:{
        userSlice,
        blogSlice,
        googleSlice
    }
})

export default store;