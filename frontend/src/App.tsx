import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import SignUp from './pages/Signup/SignUp';
import { selectToken } from '../src/store/features/auth/authSlice';
import {
  initializeApp,
  reloadApp,
  selectError,
} from './store/features/app/appSlice';
import { useAppDispatch } from './hooks/useAppDispatch';

function App() {
  const token = useSelector(selectToken);
  const error = useSelector(selectError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeApp());

    return () => {
      dispatch(reloadApp());
    };
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="p-4 grid auto-cols-auto">
      <Toaster />
      <Routes>
        {token ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
