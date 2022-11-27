import { configureStore } from "@reduxjs/toolkit";

import reducers from "../../redux/reducers";

const store = configureStore({
  reducer: reducers,
});
export default store;
