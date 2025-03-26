import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArticleServices from "../services/article";
import { postArticleFailure, postArticleStart } from "../slice/article";
import { ArticleForm, ValidationError } from "../ui";
import Error404 from './Error404'

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn } = useSelector(state => state.auth)

  const formSubmit = async (e) => {
    e.preventDefault();
    dispatch(postArticleStart());
    try {
      await ArticleServices.postArticle({ title, description, body });
      navigate("/");
    } catch (error) {
      dispatch(postArticleFailure(error?.response?.data?.errors || {'errors': {'Request error': ['Request error 404']}} ));
    }
  };

  if (!loggedIn) return <Error404 />

  return (
    <div className="text-center">
      <h1 className="fs-2">Create article</h1>
      <div className="w-75 mx-auto">
        <ValidationError />
        <ArticleForm btnName={'Create'} {...{ title, setTitle, description, setDescription, body, setBody, formSubmit }} />
      </div>
    </div>
  );
};

export default CreateArticle;
