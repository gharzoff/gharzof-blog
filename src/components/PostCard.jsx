import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useState, useCallback } from "react";
import ArticleServices from "../services/article";
import {
  getArticlesStart,
  getArticlesSuccess,
  getArticlesFailure,
} from "../slice/article";
import { BASE_URL } from "../constants";
import {
  Heart,
  HeartFill,
  PencilSquare,
  Trash,
  Eye,
} from "react-bootstrap-icons";

const ArticleCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(item?.is_liked || false);
  const [likesCount, setLikesCount] = useState(item?.total_likes || 0);

  const deleteHandler = useCallback(async (id) => {
    if (!window.confirm("Ushbu postni o‘chirib tashlamoqchimisiz?")) return;
    try {
      await ArticleServices.deleteArticle(id);
      dispatch(getArticlesStart());
      const response = await ArticleServices.getArticles();
      dispatch(getArticlesSuccess(response));
    } catch (error) {
      dispatch(getArticlesFailure());
    }
  }, [dispatch]);

  const toggleLike = useCallback(async () => {
    try {
      const { data } = await ArticleServices.likeArticle(item.id);
      setLiked(data?.is_liked);
      setLikesCount(data?.likes);
    } catch (err) {
      console.error("Like xatosi:", err);
    }
  }, [item.id]);

  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm">
        {item.image && (
          <img
            src={BASE_URL + item.image}
            className="card-img-top"
            alt={item.title}
            style={{ height: "230px", objectFit: "cover" }}
          />
        )}

        <div className="card-body d-flex flex-column">
          {/* Sarlavha va qisqacha mazmun */}
          <h5 className="card-title fw-semibold">{item.title}</h5>
          <p className="card-text text-truncate">{item.content}</p>

          {/* Muallif haqida ma’lumot */}
          <div className="d-flex align-items-center gap-2 mb-3">
            <img
              src={BASE_URL + item.author?.profile_image}
              alt={item.author?.username}
              className="rounded-circle border"
              width={32}
              height={32}
            />
            <div>
              <small className="fw-bold d-block">{item.author?.username}</small>
              <small className="text-muted">
                {moment(item.created_at).fromNow()} · {item.reading_time || "2 min read"}
              </small>
            </div>
          </div>

          {/* Harakat tugmalari */}
          <div className="mt-auto">
            <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center border-top pt-3">
              <div className="btn-group">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => navigate(`/posts/${item.id}`)}
                >
                  <Eye className="me-1" /> Ko‘rish
                </button>

                {item.is_owner && (
                  <>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => navigate(`/edit/${item.id}`)}
                    >
                      <PencilSquare className="me-1" /> Tahrirlash
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteHandler(item.id)}
                    >
                      <Trash className="me-1" /> O‘chirish
                    </button>
                  </>
                )}
              </div>

              <div className="d-flex align-items-center gap-3">
                <button
                  className="btn btn-sm text-danger border-0"
                  onClick={toggleLike}
                  title="Postni yoqtirish"
                >
                  {liked ? <HeartFill size={18} /> : <Heart size={18} />} {likesCount}
                </button>

                <div className="text-muted small d-flex align-items-center">
                  <Eye className="me-1" size={18} /> {item?.views} marta ko‘rilgan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
