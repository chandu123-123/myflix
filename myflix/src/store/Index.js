// Import necessary modules and constants
import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
console.log(process.env.REACT_APP_API)
const API_KEY ="e3d5357439a2ef1e6912d0b64b2779b5";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Initial state
const initialState = {
  movies: [], // An array to store movie data
  genresLoaded: false,
  genres: [], // An array to store genre data
};

// Create an async thunk to fetch genres (as you already have)
export const getGenres = createAsyncThunk("myflix/genres", async () => {
  try {

    const response = await axios.get(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Add an async thunk to generate movies based on genres
// Add an async thunk to generate movies based on genres
export const generateMovies = createAsyncThunk(
  "myflix/generateMovies",
  async (genreId) => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
      );
      const genreResponse = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
      );

      // Create a map of genre IDs to genre names for easy lookup
      const genreMap = genreResponse.data.genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});

      const newMovies = response.data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        genre: movie.genre_ids.map((genreId) => genreMap[genreId]),
      }));

      // Return only the first 20 movies, replacing the previous movies
      return newMovies.slice(0, 20);
    } catch (error) {
      throw error;
    }
  }
);
export const getlikedmovies = createAsyncThunk(
  "myflix/likedmovies",
  async (email) => {
    console.log(email, "helll");
    const response = await axios.get(
      `https://myflix-backend-yrmp.onrender.com/api/user/liked/${email}`
    );
    console.log("response", response.data.movies);
    return response.data.movies;
  }
);

const myflixSlice = createSlice({
  name: "myflix",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresLoaded = true;
      })
      .addCase(generateMovies.fulfilled, (state, action) => {
        // Append the generated movies to the existing movies array
        state.movies = [...state.movies, ...action.payload];
      })
      .addCase(getlikedmovies.fulfilled, (state, action) => {
        // Append the generated movies to the existing movies array
        console.log(action.payload);
        state.movies = [...state.movies, ...action.payload];
      });
  },
});

// Configure the Redux store
export const store = configureStore({
  reducer: {
    myflix: myflixSlice.reducer,
  },
});

export const { dispatch } = store;

// Example of how to use these actions:
// dispatch(getGenres());
// dispatch(generateMovies(genreId)); // Replace genreId with the desired genre ID
