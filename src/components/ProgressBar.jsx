import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProgressBar = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start(); // Loaderni boshlash
    setTimeout(() => {
      NProgress.done(); // Loaderni tugatish
    }, 100); // 0.5 sekund kutish
  }, [location.pathname]); // Har safar sahifa o‘zgarsa ishga tushadi

  return null;
};

export default ProgressBar;
