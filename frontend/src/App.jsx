
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Dashboard from "./pages/Dashboard/Dashboard";

import MyBooks from "./pages/MyBooks/MyBooks";
import AddBook from "./pages/AddBook/AddBook";
import EditBook from "./pages/EditBook/EditBook";
import BookDetails from "./pages/BookDetails/BookDetails";
import Reviews from "./pages/Reviews/Reviews";

import Favorites from "./pages/Favorites/Favorites";
import Wishlist from "./pages/Wishlist/Wishlist";
import Goals from "./pages/Goals/Goals";
import Statistics from "./pages/Statistics/Statistics";
import Achievements from "./pages/Achievements/Achievements";

import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";

import Settings from "./pages/Settings/Settings";

function Layout() {

  const location =
    useLocation();

  const hideNavbar = [

    "/dashboard",

    "/books",

    "/add-book",

    "/favorites",

    "/wishlist",

    "/goals",

    "/statistics",

    "/achievements",

    "/profile",

    "/edit-profile",

    "/settings",

  ].some(

    (path) =>

      location.pathname.startsWith(
        path
      )

  );

  return (

    <>

      {!hideNavbar &&
        <Navbar />}

      <Routes>

        {/* ---------- Public Routes ---------- */}

        <Route
          path="/"
          element={
            <Landing />
          }
        />

        <Route
          path="/login"
          element={
            <Login />
          }
        />

        <Route
          path="/register"
          element={
            <Register />
          }
        />

        {/* ---------- Dashboard ---------- */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ---------- Books ---------- */}

        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <MyBooks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-book"
          element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books/:id"
          element={
            <ProtectedRoute>
              <BookDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-book/:id"
          element={
            <ProtectedRoute>
              <EditBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reviews/:bookId"
          element={
            <ProtectedRoute>
              <Reviews />
            </ProtectedRoute>
          }
        />

        {/* ---------- Favorites ---------- */}

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        {/* ---------- Wishlist ---------- */}

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        {/* ---------- Goals ---------- */}

        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <Goals />
            </ProtectedRoute>
          }
        />

        {/* ---------- Statistics ---------- */}

        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
          }
        />

        {/* ---------- Achievements ---------- */}

        <Route
          path="/achievements"
          element={
            <ProtectedRoute>
              <Achievements />
            </ProtectedRoute>
          }
        />

        {/* ---------- Profile ---------- */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        {/* ---------- Settings ---------- */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Routes>

    </>

  );

}

function App() {

  return (

    <BrowserRouter>

      <Layout />

    </BrowserRouter>

  );

}

export default App;