import {Router} from "express";
import movieControllers from "../controllers/movieControllers.js";
import {checkRoles} from "../middlewares/authMiddleware.js";

const router = Router();
// Get all movies
router.get(
  "/movies",
  checkRoles(["USER", "ADMIN"]),
  movieControllers.getAllMovies
);
// Get movie by ID
router.get(
  "/movies/:id",
  checkRoles(["USER", "ADMIN"]),
  movieControllers.getMovieById
);
// Create a new movie
router.post("/movies", checkRoles(["ADMIN"]), movieControllers.createMovie);
// Update an existing movie
router.put("/movies/:id", checkRoles(["ADMIN"]), movieControllers.updateMovie);
// Delete an existing movie
router.delete(
  "/movies/:id",
  checkRoles(["ADMIN"]),
  movieControllers.deleteMovie
);
export default router;
