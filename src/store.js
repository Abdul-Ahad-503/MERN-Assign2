import { configureStore } from '@reduxjs/toolkit'
import pageSlice from './redux/pageSlice'

export default configureStore({
  reducer: {
    pages : pageSlice,
  },
})

