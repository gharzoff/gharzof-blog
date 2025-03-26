import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MainLoader = () => {
  return (
    <div className="container album py-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="col">
            <div className="card shadow-sm">

              <Skeleton height={200} />


              <div className="card-body">
                <h5>
                  <Skeleton width="80%" />
                </h5>
                <p>
                  <Skeleton count={2} />
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <Skeleton width={60} height={30} />
                  <Skeleton width={100} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainLoader;
