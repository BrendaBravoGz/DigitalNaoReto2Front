// redux/reducers.js
const initialState = {};

export const excelDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EXCEL_DATA':
      return action.payload;
    default:
      return state;
  }
};
