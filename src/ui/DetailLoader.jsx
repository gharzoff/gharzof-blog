import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DetailLoader = () => {
  return (
    <div className="py-3 mb-4 rounded-3">
      <div className="container-fluid pb-5">

        <h1>
          <Skeleton width="60%" height={40} />
        </h1>
        <p className="col-md-8 fs-4">
          <Skeleton count={3} />
        </p>
        <p className="text-muted">
          <Skeleton width="30%" />
        </p>


        <div className="col-md-6">
          <div className="d-flex border rounded shadow-sm p-3">

            <div className="flex-grow-1">
              <Skeleton width={120} height={20} />
              <Skeleton width="90%" height={15} />
              <Skeleton width="80%" height={15} />
            </div>


            <Skeleton height={100} width={100} className="me-3" />
          </div>
        </div>

        <div className="mt-4">
          <Skeleton count={5} height={20} />
        </div>
      </div>
    </div>
  );
};

export default DetailLoader;
