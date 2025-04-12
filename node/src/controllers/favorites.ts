const { AppDataSource } = require("../database/app-data-source");
const { Favorites } = require("../entities/favorites");

export const addFavorite = async (req, res) => {
  const user_id = req.currentUserId;
  const flight_number = req.params.flight_number;
  const favoritesRepo = AppDataSource.getRepository(Favorites);
  const currentFav = await favoritesRepo.find({
    where: {
      flight_number,
      user_id,
    },
  });
  let responseMessage = "";
  let statusCode = 200;
  if (!currentFav.length) {
    await favoritesRepo.insert({
      flight_number,
      user_id,
    });
    responseMessage = `Favorite for flight ${flight_number} has been added (userId: ${user_id}).`;
    statusCode = 201;
  } else {
    responseMessage = `Favorite already exists. Flight Number = ${flight_number}; User Id = ${user_id}`;
  }
  return res.status(statusCode).json(responseMessage);
};

export const removeFavorite = async (req, res) => {
  const user_id = req.currentUserId;
  const flight_number = req.params.flight_number;
  const favoritesRepo = AppDataSource.getRepository(Favorites);
  const deleteFavorite = await favoritesRepo.delete({
    flight_number,
    user_id,
  });
  const responseMessage = deleteFavorite.affected
    ? `Favorite for flight ${flight_number} has been removed (userId: ${user_id}).`
    : `Favorite not found for deletion. Flight Number = ${flight_number}; User Id = ${user_id}`;
  return res.status(200).json(responseMessage);
};

export const getFavorites = async (_, res) => {
  const favoritesRepo = AppDataSource.getRepository(Favorites);
  const favs = await favoritesRepo.find();
  return res.status(200).json(favs);
};
