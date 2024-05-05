import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher } from "../../config";
// 8fd6c255958c1395be9ce44eaf195d1c
const MovieList = ({ type = "now_playing" }) => {
  //   const [movies, setMovies] = useState([]);
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=8fd6c255958c1395be9ce44eaf195d1c`,
    fetcher
  );

  //   useEffect(() => {
  //     if (data && data.results) {
  //       setMovies(data.results);
  //     }
  //     // console.log(movies);
  //   }, [data]);
  const movies = data?.results || [];

  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
