import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../config";
import { Swiper, SwiperSlide } from "swiper/react";

import MovieCard from "../components/movie/MovieCard";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const { data, error } = useSWR(
    `
  https://api.themoviedb.org/3/movie/${movieId}?api_key=8fd6c255958c1395be9ce44eaf195d1c`,
    fetcher
  );
  if (!data) {
    return <div>Item is undefined</div>;
  }
  const { backdrop_path, title, genres, overview } = data;

  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative ">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat "
          style={{
            backgroundImage: `url(http://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[500px] max-w-[900px] mx-auto -mt-[300px] relative z-10 pb-10">
        <img
          src={`http://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <h1 className="text-white text-center text-4xl font-bold mb-10">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => (
            <span
              key={item.id}
              className="py-2 px-4 border-primary text-primary border rounded"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieCredits />
      <MovieVideos />
      <MovieSimilar />
    </div>
  );
};

function MovieCredits() {
  const { movieId } = useParams();

  const { data, error } = useSWR(
    `
  https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=8fd6c255958c1395be9ce44eaf195d1c`,
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;

  return (
    <div className="max-w-[1280px] mx-auto py-10">
      <h2 className="text-center text-3xl mb-10">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item bg-white rounded-lg" key={item.id}>
            <img
              src={`http://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt=""
              className="w-full h-[350px] object-cover rounded-lg mb-3"
            />
            <h3 className="text-xl text-black text-center font-bold mb-2">
              {item.name}
            </h3>
            <p className="text-black text-center">{item.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieVideos() {
  const { movieId } = useParams();

  const { data, error } = useSWR(
    `
  https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=8fd6c255958c1395be9ce44eaf195d1c`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results && results <= 0) return null;
  return (
    <div className="py-10 ">
      <h2 className="text-center text-3xl mb-10">Trailer</h2>
      {results.slice(0, 1).map((item) => (
        <div
          key={item.id}
          className="w-full pb-10 flex items-center justify-center"
        >
          <iframe
            width="894"
            height="503"
            src={`https://www.youtube.com/embed/${item.key}`}
            title="David Kushner - Daylight (Official Music Video)"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            // className="w-full h-full object-fill"
          ></iframe>
        </div>
      ))}
    </div>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();

  const { data, error } = useSWR(
    `
  https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=8fd6c255958c1395be9ce44eaf195d1c`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results && results <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium">Similar movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetailsPage;
{
  /* <iframe
  width="894"
  height="503"
  src={`https://www.youtube.com/embed/MoN9ql6Yymw`}
  title="David Kushner - Daylight (Official Music Video)"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
></iframe>; */
}
