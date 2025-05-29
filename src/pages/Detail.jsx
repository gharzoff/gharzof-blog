import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";
import moment from "moment";
import ArticleServices from "../services/article";
import {
  getArticleDetailFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
} from "../slice/article";
import Error404 from "./Error404";
import { DetailLoader } from "../ui";
import { BASE_URL } from "../constants";
import { Helmet } from "react-helmet";


import {
  FaEye,
  FaHeart,
  FaShareAlt,
  FaEdit,
  FaTrash,
  FaCopy,
  FaFacebook,
  FaTelegram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { detail, isLoading, error } = useSelector((state) => state.article);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showShare, setShowShare] = useState(false);


  const hasViewed = useRef(false);

  // Maqola tafsilotlarini olish
  const getDetailArticle = useCallback(async () => {
    dispatch(getArticleDetailStart());
    try {
      const response = await ArticleServices.getArticle(id);
      dispatch(getArticleDetailSuccess(response));
      setLiked(response.is_liked);
      setLikesCount(response.total_likes);
    } catch (err) {
      dispatch(getArticleDetailFailure(err?.response?.data?.errors));
    }
  }, [dispatch, id]);

  const addView = useCallback(async () => {
    if (hasViewed.current) return;
    hasViewed.current = true;

    const viewedPosts = JSON.parse(localStorage.getItem("viewed_posts")) || [];
    if (!viewedPosts.includes(id)) {
      try {
        await ArticleServices.add_view(id);
        viewedPosts.push(id);
        localStorage.setItem("viewed_posts", JSON.stringify(viewedPosts));
      } catch (err) {
        console.error("View qo‘shishda xatolik:", err);
      }
    }
  }, [id]);

  useEffect(() => {
    getDetailArticle();
    addView();
  }, [getDetailArticle, addView]);


  const handleLike = useCallback(async () => {
    try {
      const { data } = await ArticleServices.likeArticle(id);
      setLiked(data.is_liked);
      setLikesCount(data.likes);
    } catch (err) {
      console.error("Like xatosi:", err);
    }
  }, [id]);


  const handleDelete = useCallback(async () => {
    if (window.confirm("Siz haqiqatdan ham ushbu postni o‘chirmoqchimisiz?")) {
      try {
        await ArticleServices.deleteArticle(id);
        navigate("/");
      } catch (err) {
        console.error("O‘chirishda xatolik:", err);
      }
    }
  }, [id, navigate]);


  const handleCopy = useCallback(() => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("Havola nusxalandi!");
  }, []);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
    telegram: `https://t.me/share/url?url=${window.location.href}`,
    x: `https://twitter.com/intent/tweet?url=${window.location.href}`,
  };

  if (isLoading) return <DetailLoader />;
  if (error) return <Error404 />;

  return (
    <>
      <Helmet>
        <meta name="description" content={detail?.content ? detail.content.slice(0, 150) + "..." : "Maqola tafsilotlari"} />
        <meta name="keywords" content={detail?.tags ? detail.tags.map(tag => tag.name).join(", ") : "maqola, dasturlash, gharzof"} />
        <meta property="og:title" content={detail?.title || "Maqola tafsiloti"} />
        <meta property="og:description" content={detail?.content ? detail.content.slice(0, 150) + "..." : "Gharzof maqolasi tafsilotlari"} />
        <meta property="og:image" content={detail?.image ? BASE_URL + detail.image : ""} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>


      <div className="py-3 mb-4 rounded-3">
        <div className="container-fluid pb-5">
          <h1 className="display-5 fw-bold">{detail?.title}</h1>
          <div className="text-muted mb-3">
            <span><strong>Yaratilgan:</strong> {moment(detail?.created_at).format("DD MMM, YYYY")} • </span>
            <span><FaEye /> {detail?.views} marta ko‘rilgan • </span>
            <span>{detail?.reading_time}</span>
          </div>

          {detail?.image && (
            <div className="mb-3">
              <img
                width="90%"
                src={BASE_URL + detail.image}
                alt="Post rasmi"
                className="img-fluid rounded"
              />
            </div>
          )}

          <div className="mb-3">
            <span className="badge bg-primary">{detail?.category?.name}</span>
            {detail?.tags?.map((tag, index) => (
              <span key={index} className="badge bg-secondary ms-2">#{tag.name}</span>
            ))}
          </div>

          <div className="col-md-6 mb-4">
            <div className="row g-0 border rounded overflow-hidden flex-md-row shadow-sm position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary text-uppercase">
                  {detail?.author?.username}
                </strong>
                <p className="card-text mb-auto">{detail?.author?.bio}</p>
              </div>
              <div className="col-auto d-none d-lg-block">
                <img
                  className="bd-placeholder-img"
                  width="200"
                  height="100%"
                  src={BASE_URL + detail?.author?.profile_image}
                  alt="Muallif rasmi"
                />
              </div>
            </div>
          </div>

          <h3 className="col-md-8 fs-4 mb-4">{detail?.content}</h3>

          <div className="d-flex gap-3 align-items-center flex-wrap">
            <button onClick={handleLike} className={`btn ${liked ? "btn-danger" : "btn-outline-danger"}`}>
              <FaHeart /> {likesCount}
            </button>

            <button className="btn btn-outline-secondary" onClick={() => setShowShare(!showShare)}>
              <FaShareAlt /> Ulashish
            </button>

            {showShare && (
              <div className="d-flex gap-2 mt-2">
                <a className="btn btn-sm btn-outline-primary" href={shareUrls.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                <a className="btn btn-sm btn-outline-info" href={shareUrls.telegram} target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
                <a className="btn btn-sm btn-outline-dark" href={shareUrls.x} target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
                <button className="btn btn-sm btn-outline-secondary" onClick={handleCopy}><FaCopy /></button>
              </div>
            )}

            {detail?.is_owner && (
              <>
                <button className="btn btn-outline-warning" onClick={() => navigate(`/edit/${id}`)}>
                  <FaEdit /> Tahrirlash
                </button>
                <button className="btn btn-outline-danger" onClick={handleDelete}>
                  <FaTrash /> O‘chirish
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
