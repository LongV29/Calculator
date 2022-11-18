import { createSlice } from "@reduxjs/toolkit";

export const CalculaterReducer =  createSlice({
  name: "calculater",
  initialState : {
    inputValue: "",
    result: "",
    history: [],
    checkHistory: false
  },
  reducers : {
    addInputValue: (state, action)=>{
      const newInputValue = state.inputValue + action.payload
        state.inputValue = newInputValue
    },
    displayResult: (state, action)=>{
      const newResult = action.payload
      const newHistory = [...state.history]
      newHistory.push(`${state.inputValue}=${newResult}`)
      state.result= newResult
      state.history= newHistory
    },
    deleteInputValue: (state) =>{
      const newInputValue = state.inputValue.slice(0,-1)
      state.inputValue= newInputValue
    },
    clearInput: (state) => {
      state.result= ""
      state.inputValue= ""
    },
    handleHistory: (state) => {
      state.checkHistory= !state.checkHistory
    }
  }
})

export const { addInputValue, displayResult, deleteInputValue, clearInput, handleHistory } = CalculaterReducer.actions

export default CalculaterReducer.reducer;