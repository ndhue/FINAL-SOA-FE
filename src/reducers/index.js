import { combineReducers } from "redux";
import jobTypesReducer from "containers/HomeTemplate/_components/Navbar/modules/reducer";
import searchingReducer from "containers/HomeTemplate/HomePage/modules/reducer";
import jobDetailReducer from "containers/HomeTemplate/JobDetailsPage/modules/reducer";
import userLoginReducer from "containers/AdminTemplate/LoginPage/modules/reducer";
import signUpReducer from "containers/AdminTemplate/SignUpPage/modules/reducer";
import modalReducer from "containers/AdminTemplate/_components/Modal/modules/reducer";
import modalProductReducer from "containers/AdminTemplate/_components/ModalProduct/modules/reducer";
import usersManagementReducer from "containers/AdminTemplate/UsersManagementPage/modules/reducer";
import productsManagementReducer from "containers/HomeTemplate/ShopArtPage/modules/reducer";
import productsManagementReducerByAdmin from "containers/AdminTemplate/ProductsManagementPage/modules/reducer";
export const rootReducer = combineReducers({
  jobTypesReducer,
  searchingReducer,
  jobDetailReducer,
  userLoginReducer,
  signUpReducer,
  modalReducer,
  modalProductReducer,
  usersManagementReducer,
  productsManagementReducer,
  productsManagementReducerByAdmin
});