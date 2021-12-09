import axios from "axios";
import { API_Key } from "../common/keys";

const BASE_URL = 'https://api.themoviedb.org'

export async function fetchSearchMovies(textInput) {
    const  response = `${BASE_URL}/3/search/movie?api_key=${API_Key}&language=en-US&query=${textInput}&page=1&include_adult=false`;
    return await axios.get(response);

 }


                   

                           