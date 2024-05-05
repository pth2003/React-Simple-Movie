import { Fragment } from "react";

import "swiper/scss";

import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import MoviePage from "./pages/MoviePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies" element={<MoviePage />}></Route>
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}></Route>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
