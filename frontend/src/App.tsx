import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import SignUp from './pages/Signup/SignUp';
import { Toaster } from 'react-hot-toast';
import { selectUser } from '../src/store/features/auth/authSlice';

function App() {
  const user = useSelector(selectUser);

  return (
    <div className="p-4 grid auto-cols-auto">
      <Toaster />
      <Routes>
        {user ? (
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
