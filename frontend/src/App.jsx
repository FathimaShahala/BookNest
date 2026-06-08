import {
  BrowserRouter,
  Routes,
  Route,
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

// Future Phase 6 Pages
import Favorites from "./pages/Favorites/Favorites";
import Wishlist from "./pages/Wishlist/Wishlist";
import Goals from "./pages/Goals/Goals";
import Statistics from "./pages/Statistics/Statistics";
  
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

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

        

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
 
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        /> 
        <Route
  path="/goals"
  element={
    <ProtectedRoute>
      <Goals />
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

        <Route
  path="/statistics"
  element={
    <ProtectedRoute>
      <Statistics />
    </ProtectedRoute>
  }
/>
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;