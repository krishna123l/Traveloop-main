import { Route, Routes } from 'react-router';
import './App.css';
import Home from '../pages/Home';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ForgetPassword from '../pages/ForgetPassword';
import ResetPassword from '../pages/ResetPassword';
import SingleTour from '../pages/SingleTour';
import AuthPage from '../pages/AuthPage';
import AllTours from '../pages/AllTours';
import UserProfile from '../pages/UserProfile';
import verifyPayment from '../components/SingleTour.jsx/verifyPayment';
import VerifyPayment from '../components/SingleTour.jsx/verifyPayment';
import UserBookings from '../pages/UserBookings';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users/Me`,
          {
            credentials: 'include',
          }
        );

        const respObj = await resp.json();

      
        if (respObj.status === 'sucess') {
          setUser({
            isLoggedin: true,
            name: respObj.data.data.name,
            email: respObj.data.data.email,
            role: respObj.data.data.role,
            photo: respObj.data.data.photo,
          });
        } else {
          
          setUser({ isLoggedin: false, name: 'guest' });
        }
      } catch (error) {
        
        setUser({ isLoggedin: false, name: 'guest' });
      }
    };

    fetchUser();
  }, []);

  const afterLoginorSignUp = (respObj) => {
    
    const userData = {
      isLoggedin: true,
      name: respObj.data.user.name,
      email: respObj.data.user.email,
      role: respObj.data.user.role,
      photo: respObj.data.user.photo,
    };
    setUser(userData);
  };

  // const afterLoginorSignUp = (respObj) => {
  //   const userData = { isLoggedin: true, name: respObj.data.user.name };
  //   localStorage.setItem('isLoggedIn', true);
  //   setUser(userData);
  // };

  // const getUser = async () => {
  //   try {
  //     const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/Me`, {
  //       credentials: 'include',
  //     });

  //     const respObj = await resp.json();
  //     console.log(respObj);

  //     if (respObj.status === 'sucess') {
  //       setUser({
  //         isLoggedin: true,
  //         name: respObj.data.data.name,
  //         email: respObj.data.data.email,
  //         role: respObj.data.data.role,
  //         photo: respObj.data.data.photo,
  //       });
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  // useEffect(() => {
  //   if (user.isLoggedin) {
  //     getUser();
  //   }
  // }, [user.isLoggedin]);

  const handleLogout = async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/logout`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      const respObj = await resp.json();
      if (respObj.status === 'sucess') {
        // localStorage.removeItem('isLoggedin');
        setUser({
          isLoggedin: false,
          name: 'guest',
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home user={user} handleLogout={handleLogout} />}
        />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/tour/:id"
          element={<SingleTour user={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/auth"
          element={
            <AuthPage
              afterLogin={afterLoginorSignUp}
              afterSignUp={afterLoginorSignUp}
            />
          }
        />
        <Route
          path="/user/profile"
          element={
            <UserProfile
              user={user}
              setUser={setUser}
              handleLogout={handleLogout}
            />
          }
        />
        <Route
          path="/tours"
          element={<AllTours user={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/payment-sucess"
          element={<VerifyPayment user={user} handleLogout={handleLogout} />}
        />
        <Route
          path="/tour/user-bookings"
          element={<UserBookings user={user} handleLogout={handleLogout} />}
        />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
