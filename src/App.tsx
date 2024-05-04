import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useProfile } from "./hooks/useProfile";
import { useEffect } from "react";
import { useAppDispatch } from "./store/store";
import { setIsAuth } from "./store/slices/authSlice";
import Notification from "./components/ui/notification/Notification";

function App() {
  const dispatch = useAppDispatch();
  const { isSuccess } = useProfile();

  useEffect(() => {
    isSuccess && dispatch(setIsAuth(true));
  }, [isSuccess]);

  return (
    <div className="App">
      <Header />
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      <Footer />
      <Notification />
    </div>
  );
}

export default App;
