import CalculaterReducer from './Calculater'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    calculater: CalculaterReducer,
  }
})

export default store;