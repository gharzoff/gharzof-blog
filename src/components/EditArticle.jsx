import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  articleDetailFailure,
  articleDetailStart,
  articleDetailSuccess,
  getArticleFailure,
  getArticleStart,
  getArticleSuccess,
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
} from "../slice/article";
import Error404 from "./Error404";
import { ArticleForm, ValidationError } from "../ui";
import ArticleServices from "../services/article";

const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const auth = useSelector((state) => state.auth);
  const article = useSelector((state) => state.article);

  const refreshArticles = async () => {
    dispatch(getArticleStart());
    try {
      const response = await ArticleServices.getArticles();
      dispatch(getArticleSuccess(response.articles));
    } catch {
      dispatch(getArticleFailure());
    }
  };

  useEffect(() => {
    const getDetailArticle = async () => {
      dispatch(articleDetailStart());

      try {
        const { article } = await ArticleServices.getArticle(slug);
        dispatch(articleDetailSuccess(article));

        setTitle(article?.title);
        setDescription(article?.description);
        setBody(article?.body);
        setAuthor(article?.author?.username);
      } catch (err) {
        console.error("Error fetching article:", err);
        dispatch(
          articleDetailFailure(
            err?.response?.statusText || {
              errors: { "Request error": ["Request error 404"] },
            }
          )
        );
      }
    };

    getDetailArticle();
  }, [slug]);

  const formSubmit = async (e) => {
    e.preventDefault();
    dispatch(postArticleStart());

    try {
      await ArticleServices.editArticle(slug, { title, description, body });
      dispatch(postArticleSuccess());
      await refreshArticles();
      navigate("/");
    } catch (error) {
      console.error("Error updating article:", error);
      dispatch(postArticleFailure(error?.response?.data?.errors));
    }
  };

  if (
    !article ||
    article?.error === "Not Found" ||
    (author && author !== auth?.user?.username)
  ) {
    return <Error404 />;
  }

  return (
    <div className="text-center">
      <h1 className="fs-2">Edit article</h1>
      <div className="w-75 mx-auto">
        <ValidationError />
        <ArticleForm
          btnName="Save"
          {...{
            title,
            setTitle,
            description,
            setDescription,
            body,
            setBody,
            formSubmit,
          }}
        />
      </div>
    </div>
  );
};

export default EditArticle;
