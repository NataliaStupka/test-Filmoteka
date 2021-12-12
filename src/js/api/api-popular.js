import axios from "axios";
import { API_Key } from "../common/keys";

const BASE_URL = 'https://api.themoviedb.org'

export async function fetchPopularMovies() {
    const response = `${BASE_URL}/3/trending/movie/day?api_key=${API_Key}`;
    return await axios.get(response);

 }
