import { useCallback } from "react";
import { useSelector } from "react-redux";

const ValidationError = () => {
  const authError = useSelector(state => state.auth.error);
  const articleError = useSelector(state => state.article.error);

  const errorMessage = useCallback(() => {
    const error = authError || articleError; // Har ikkala errorni tekshiramiz
    if (!error || typeof error !== "object") return [];

    const errorData = error.errors ? error.errors : error;

    return Object.keys(errorData).map((name) => {
      const msg = Array.isArray(errorData[name]) 
        ? errorData[name].join(", ")
        : typeof errorData[name] === "object"
        ? JSON.stringify(errorData[name]) 
        : errorData[name];

      return `${name} - ${msg}`;
    });
  }, [authError, articleError]);

  return (
    (authError || articleError) &&
    errorMessage().map((errorText, index) => (
      <div className="alert alert-danger m-1 p-1 text-start" role="alert" key={index}>
        {errorText}
      </div>
    ))
  );
};

export default ValidationError;
