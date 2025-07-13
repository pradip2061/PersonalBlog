import { configureStore } from "@reduxjs/toolkit";
import getblogreducer from '../store/getblog/getblogSlice'
import getblogcategory from '../store/getblogcategory/getblogcategorySlice'
const store = configureStore({
  reducer: {
    getblog:getblogreducer,
    getblogcategory:getblogcategory
  },
});

export default store;