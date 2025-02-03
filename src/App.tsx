import AOS from "aos";
import { useEffect } from "react";
import Routes from "./routes";
import { useAppDispatch } from "./redux/store";
import NavigationScroll from "./ui-kits/NavigationScroll/NavigationScroll";
import { fetchAllCaseStudyAsync } from "./redux/slices/casestudy/casestudy.reducer";
import "aos/dist/aos.css";
import "./App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCaseStudyAsync());
  }, [dispatch]);

  return (
    <NavigationScroll>
      <Routes />
    </NavigationScroll>
  );
}

export default App;
