// import attachCurrentUser from '../middlewares/attachCurrentUser'
// import { getLaunches, addLaunchToUserFavorites, removeLaunchFromUserFavorites} from '../../controllers/launches'
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favorites";
import { attachCurrentUser } from "../middlewares/attachCurrentUser";

export default (router) => {
  router.get("/favorites", getFavorites);
  router.post("/favorites/:flight_number", attachCurrentUser, addFavorite);
  router.delete("/favorites/:flight_number", attachCurrentUser, removeFavorite);
};
