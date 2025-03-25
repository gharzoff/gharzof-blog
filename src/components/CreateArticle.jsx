import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArticleServices from "../services/article";
import { getArticleStart, getArticleSuccess, postArticleFailure, postArticleStart } from "../slice/article";
import { ArticleForm } from "../ui";
import ValidationError from "./ValidationError";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    dispatch(postArticleStart());
    try {
      await ArticleServices.postArticle({ title, description, body });
      navigate("/");
    } catch (error) {
      dispatch(postArticleFailure(error?.response?.data?.errors));
    }
  };

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
