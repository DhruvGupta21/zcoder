import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Question from './components/AddQuestion/Question';
import ViewQuestion from './components/ViewQuestion';
import Auth from './components/Auth';
import { login, logout, selectUser } from './features/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './firebase';
import Calendar from './components/Calendar';
import Profile from './components/Profile/Profile';

function PrivateRoute({ element: Element, ...rest }) {
  const user = useSelector(selectUser);

  if (user) {
    return <Element {...rest} />;
  } else {
    return <Navigate to="/auth" />;
  }
}


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          displayName: authUser.displayName,
          email: authUser.email
        }));
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<PrivateRoute element={Main} />} />
          <Route path="/add-question" element={<PrivateRoute element={Question} />} />
          <Route path="/question" element={<PrivateRoute element={ViewQuestion} />} />
          <Route path="/calendar" element={<PrivateRoute element={Calendar} />} />
          <Route path="/profile" element={<PrivateRoute element={Profile} />} />

          {/* <Route path="/" element={Main} />
          <Route path="/add-question" element={Question} />
          <Route path="/question" element={ViewQuestion} />
          <Route path="/calendar" element={EventCalendar} /> */}

          {/* <Route path="*" element={<Navigate to={user ? "/" : "/auth"} />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
