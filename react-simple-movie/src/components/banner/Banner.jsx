import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=8fd6c255958c1395be9ce44eaf195d1c`,
    fetcher
  );

  const movies = data?.results || [];

  return (
    <section className="banner h-[500px] page-container mb-20 ">
      <Swiper grabCursor="true" slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ item }) {
  if (!item) {
    return <div>Item is undefined</div>;
  }
  const { title, poster_path, backdrop_path } = item;
  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg "></div>
      <img
        src={`http://image.tmdb.org/t/p/w1280/${backdrop_path}`}
        className="w-full h-full object-contain rounded-lg "
        alt=""
      />
      <div className="absolute left-5 bottom-5  w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
        </div>
        <button className="py-3 px-6 rounded-lg text-white font-medium bg-primary ">
          Watch now!
        </button>
      </div>
    </div>
  );
}
export default Banner;
