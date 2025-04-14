// import attachCurrentUser from '../middlewares/attachCurrentUser'
// import { getLaunches, addLaunchToUserFavorites, removeLaunchFromUserFavorites} from '../../controllers/launches'
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favorites";
import { auth } from "../middlewares/auth";

export default (router) => {
  router.use(auth);
  router.get("/favorites", getFavorites);
  router.post("/favorites/:flight_number", addFavorite);
  router.delete("/favorites/:flight_number", removeFavorite);
};
