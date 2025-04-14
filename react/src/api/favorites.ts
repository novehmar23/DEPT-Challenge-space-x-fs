import axios from "utils/axios";

export const addFavorite = async (flightNumber: number) =>
  axios.post(`/favorites/${flightNumber}`);

export const removeFavorite = async (flightNumber: number) =>
  axios.delete(`/favorites/${flightNumber}`);
