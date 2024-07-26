import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
  name: 'pages',
  initialState: {
    value: '',
  },
  reducers: {
    addItem: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { addItem } = pageSlice.actions

export default pageSlice.reducer