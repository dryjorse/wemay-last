import Password from "../components/profilePage/password/Password";
import Profile from "../components/profilePage/profile/Profile";
import AboutPage from "../pages/aboutPage/AboutPage";
import CompanyPage from "../pages/companyPage/CompanyPage";
import ErrorPage from "../pages/errorPage/ErrorPage";
import FavouritesPage from "../pages/favouritesPage/FavouritesPage";
import LikedPromotionsPage from "../pages/likedPromotionsPage/LikedPromotionsPage";
import MainPage from "../pages/mainPage/MainPage";
import MyPromotionsPage from "../pages/myPromotionsPage/MyPromotionsPage";
import ProfilePage from "../pages/profilePage/ProfilePage";
import PromotionPage from "../pages/promotionPage/PromotionPage";
import PromotionPublicationPage from "../pages/promotionPublicationPage/PromotionPublicationPage";
import PromotionsPage from "../pages/promotionsPage/PromotionsPage";

export const routes = [
  {
    path: "*",
    element: <ErrorPage message="Страница не найдена" />,
  },
  { path: "/", element: <MainPage /> },
  { path: "/promotions", element: <PromotionsPage /> },
  { path: "/promotion/:id", element: <PromotionPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/company/:id", element: <CompanyPage /> },
  { path: "/profile/*", element: <ProfilePage /> },
  { path: "/favourites/", element: <FavouritesPage /> },
  { path: "/liked-promotions/", element: <LikedPromotionsPage /> },
  { path: "/my-promotions/", element: <MyPromotionsPage /> },
  { path: "/promotion-publicate/", element: <PromotionPublicationPage /> },
];

export const profileRoutes = [
  { path: "/", element: <Profile /> },
  { path: "/password", element: <Password /> },
];
