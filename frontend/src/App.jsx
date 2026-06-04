import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";

import ProtectedRoute
from "./components/ProtectedRoute/ProtectedRoute";

import AddBook
from "./pages/AddBook/AddBook";
import EditBook from "./pages/EditBook/EditBook";
import BookDetails from "./pages/BookDetails/BookDetails";

import MyBooks
from "./pages/MyBooks/MyBooks";

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

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
  path="/edit-book/:id"
  element={
    <ProtectedRoute>
      <EditBook />
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

      </Routes>

    </BrowserRouter>
  );
}

export default App;