import {IMovie} from "../interfaces/interfaces.js";
import fileService from "../utils/fileService.js";
import jsonFileReader from "../utils/jsonFileReader.js";
import movieModel from "../models/movieModel.js";

const moviesPath = "./src/data/movies.json";

class MovieService {
  async getAll() {
    return await movieModel.find();
  }

  async getOne(movieId: string) {
    return await movieModel.findById(movieId);
  }

  async create(movieData: any, imageFile: any): Promise<IMovie> {
    try {
      const {title, year, description, genre, trailer} = movieData;

      let image = "default-movie.png";
      if (imageFile) {
        image = await fileService.save(imageFile);
      }

      const newMovieData: any = {
        title,
        year,
        description,
        genre,
        image,
        trailer,
      };

      const newMovie = await movieModel.create(newMovieData);

      return newMovie.toObject() as IMovie;
    } catch (error) {
      throw error;
    }
  }

  async update(
    movieData: any,
    movieId: string,
    movieImage: any
  ): Promise<IMovie | undefined> {
    try {
      const {title, year, description, genre, trailer} = movieData;

      let updatedMovie = await movieModel.findById(movieId);

      if (!updatedMovie) {
        return undefined;
      }

      updatedMovie.title = title;
      updatedMovie.year = year;
      updatedMovie.description = description;
      updatedMovie.genre = genre;
      updatedMovie.trailer = trailer;

      if (movieImage) {
        if (updatedMovie.image !== "default.png") {
          await fileService.delete(updatedMovie.image);
        }

        updatedMovie.image = await fileService.save(movieImage);
      }

      await updatedMovie.save();

      return updatedMovie.toObject();
    } catch (error) {
      console.error("Error updating movie:", error);
      throw error;
    }
  }
  async delete(movieId: string): Promise<IMovie | undefined> {
    try {
      const deletedMovie = await movieModel.findByIdAndDelete(movieId);

      if (!deletedMovie) {
        return undefined;
      }

      if (deletedMovie.image !== "default.png") {
        await fileService.delete(deletedMovie.image);
      }

      return deletedMovie.toObject();
    } catch (error) {
      console.error("Error deleting movie:", error);
      throw error;
    }
  }
}
export default new MovieService();
