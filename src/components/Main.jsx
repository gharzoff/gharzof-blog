import React from "react";
import { useSelector } from "react-redux";
import ArticleCard from "./ArticleCard";
import { MainLoader } from "../ui";

const Main = () => {
  const { user } = useSelector((state) => state.auth);
  const { articles, isLoading } = useSelector((state) => state.article);

  return (
    <div className="container">
      {isLoading ? (
        <MainLoader />
      ) : (
        <div className="album py-5">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mb-2">
            {articles?.map((item) => (
              <ArticleCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
