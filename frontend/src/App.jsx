import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Favorites from './components/Profile/Favorites'
import Settings from './components/Profile/Settings'
import UserOrderHistory from './components/Profile/UserOrderHistory'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'
import AddBook from './pages/AddBook'
import AllBooks from './pages/AllBooks'
import AllOrders from './pages/AllOrders'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import UpdateBook from './pages/UpdateBook'
import { authActions } from './store/auth'


const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <div>

      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} >
          {role === "user" ? <Route index element={<Favorites />} /> : <Route index element={<AllOrders />} />}
          {role === "admin" && (
            <Route path="/profile/add-book" element={<AddBook />} />
          )}
          <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
          <Route path="/profile/settings" element={<Settings />} />
        </Route>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/updateBook/:id" element={<UpdateBook />} />
        <Route path='view-book-details/:id' element={<ViewBookDetails />} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App
