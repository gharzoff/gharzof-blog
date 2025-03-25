import moment from "moment";
import { useNavigate } from "react-router-dom";

const ArticleCard = ({ item, user, deleteHandler }) => {
  const navigate = useNavigate();

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <svg
          className="bd-placeholder-img card-img-top"
          width="100%"
          height="225"
          role="img"
          aria-label={`Thumbnail: ${item?.description || "No description"}`}
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <rect width="100%" height="100%" fill="#55595c"></rect>
        </svg>
        <div className="card-body d-flex flex-column">
          <h5 className="card-text">{item?.title || "Untitled"}</h5>
          <p className="card-text flex-grow-1">{item?.description || "No description available."}</p>
          <div className="d-flex justify-content-between align-items-center card-footer">
            <div className="btn-group">
              <button
                onClick={() => navigate(`/article/${item?.slug}`)}
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                View
              </button>
              {item?.author?.username === user?.username && (
                <>
                  <button
                    onClick={() => navigate(`/edit/${item?.slug}`)}
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteHandler(item?.slug)}
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
            <small className="text-body-secondary">
              <span className="text-capitalize fw-bold">
                {item?.author?.username || "Unknown Author"}
              </span>{" "}
              | {item?.createdAt ? moment(item.createdAt).fromNow() : "Unknown Date"}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
