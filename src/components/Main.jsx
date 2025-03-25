import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../ui";
import ArticleServices from "../services/article";
import { getArticleSuccess, getArticleStart, getArticleFailure } from "../slice/article";
import ArticleCard from "./ArticleCard";

const Main = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { articles, isLoading } = useSelector((state) => state.article);

  useEffect(() => {
    const fetchArticles = async () => {
      dispatch(getArticleStart());
            
      try {
        const response = await ArticleServices.getArticles();
        dispatch(getArticleSuccess(response.articles));
      } catch {
        dispatch(getArticleFailure());
      }
    };
    fetchArticles();
  }, []);

  const deleteHandler = async (slug) => {
    await ArticleServices.deleteArticle(slug);
    dispatch(getArticleStart());
    try {
      const response = await ArticleServices.getArticles();
      dispatch(getArticleSuccess(response.articles));
    } catch {
      dispatch(getArticleFailure());
    }
  };

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="album py-5">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mb-2">
            {articles?.map((item) => (
              <ArticleCard key={item.id} item={item} user={user} deleteHandler={deleteHandler} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
