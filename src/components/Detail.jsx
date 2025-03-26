import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";
import ArticleServices from "../services/article";
import { articleDetailFailure, articleDetailStart, articleDetailSuccess } from "../slice/article";
import Error404 from "./Error404";
import { DetailLoader } from "../ui";

const Detail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { detail, isLoading, error } = useSelector((state) => state.article);

  useEffect(() => {
    const getDetailArticle = async () => {
      dispatch(articleDetailStart());
      try {
        const response = await ArticleServices.getArticle(slug);
        setTimeout(()=>dispatch(articleDetailSuccess(response.article)), 300)
      } catch (err) {
        dispatch(articleDetailFailure(err?.response?.data?.errors));
      }
    };
    getDetailArticle();
  }, [slug]);

  if (isLoading) return <DetailLoader />
  
  if (error) return <Error404 />;

  return (
    <div className="py-3 mb-4 rounded-3">
      <div className="container-fluid pb-5">
        <h1 className="display-5 fw-bold">{detail?.title}</h1>
        <p className="col-md-8 fs-4">{detail?.description}</p>
        <p className="text-muted">
          <span className="fw-bold">Created at:</span> {moment(detail?.createdAt).format("DD MMM, YYYY")}
        </p>

        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary text-uppercase">
                {detail?.author?.username}
              </strong>
              <p className="card-text mb-auto">{detail?.author?.bio}</p>
            </div>
            <div className="col-auto d-none d-lg-block">
              <svg className="bd-placeholder-img" width="200" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                <title>{detail?.author?.username}</title>
                <rect width="100%" height="100%" fill="#55595c"></rect>
                <text x="45%" y="53%" fill="#fff" className="fs-2 text-uppercase p-0 m-0">
                  {detail?.author?.username?.[0]}
                </text>
              </svg>
            </div>
          </div>
        </div>

        <div>{detail?.body}</div>
      </div>
    </div>
  );
};

export default Detail;
