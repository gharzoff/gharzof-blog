import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import axios from "axios";
import { Helmet } from "react-helmet";


import PostCard from "../components/PostCard";
import { MainLoader } from "../ui";
import {
  getArticlesStart,
  getArticlesSuccess,
  getArticlesFailure,
} from "../slice/article";

const Main = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth, shallowEqual);
  const { articles, isLoading } = useSelector((state) => state.article, shallowEqual);

  const [searchTerm, setSearchTerm] = useState("");
  const [queryUrl, setQueryUrl] = useState("/posts/");

  const fetchArticles = useCallback(async () => {
    dispatch(getArticlesStart());
    try {
      const res = await axios.get(queryUrl);
      dispatch(getArticlesSuccess(res.data));
    } catch (err) {
      dispatch(getArticlesFailure(err.message));
    }
  }, [dispatch, queryUrl]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const url = searchTerm ? `/posts/?search=${searchTerm}` : "/posts/";
      setQueryUrl(url);
    },
    [searchTerm]
  );

  const handlePageChange = useCallback((url) => {
    if (!url) return;
    setQueryUrl(url);
  }, []);

  const currentPage = articles?.current_page || 1;
  const totalPages = articles?.total_pages || 1;

  return (
    <>
      <Helmet>
        <meta name="description" content="Gharzof — texnologiya yangiliklari, dasturlash bo‘yicha maslahatlar, shaxsiy fikrlar va real hayotdagi tajribalarni birlashtirgan blog. Dasturchilar va yosh ijodkorlar uchun ilhom manbai." />
        <meta name="keywords" content="Gharzof, dasturlash, blog, texnologiya, kod yozish, frontend, backend, Python, JavaScript, hayot tarzi, motivatsiya, developer blog, o'zbek dasturchi" />
        <meta property="og:title" content="Gharzof — texnologiya yangiliklari, dasturlash bo‘yicha maslahatlar, shaxsiy fikrlar va real hayotdagi tajribalarni birlashtirgan blog. Dasturchilar va yosh ijodkorlar uchun ilhom manbai." />
        <meta property="og:description" content="Texnologiya va kodlar bilan hayotni birlashtirgan o‘zbek blogi. Dasturlash, real tajribalar va ilhomli maqolalar." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="./logos.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="container">
        <form onSubmit={handleSearch} className="d-flex my-3 gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Maqolalarni qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Qidirish
          </button>
        </form>

        {isLoading ? (
          <MainLoader />
        ) : (
          <>
            <div className="album py-5">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mb-2">
                {articles?.results?.length > 0 ? (
                  articles.results.map((item) => (
                    <PostCard key={item.id} item={item} user={user} />
                  ))
                ) : (
                  <p>Natijalar topilmadi.</p>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
              <button
                onClick={() => handlePageChange(articles?.previous)}
                className="btn btn-outline-primary"
                disabled={!articles?.previous || isLoading}
              >
                ⬅ Oldingi
              </button>
              <span className="fw-semibold">
                <strong>{currentPage}</strong> / <strong>{totalPages}</strong>
              </span>
              <button
                onClick={() => handlePageChange(articles?.next)}
                className="btn btn-outline-primary"
                disabled={!articles?.next || isLoading}
              >
                Keyingi ➡
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Main;
