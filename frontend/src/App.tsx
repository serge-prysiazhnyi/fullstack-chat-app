import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import SignUp from './pages/Signup/SignUp';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext/AuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="p-4 h-screen flex items-center justify-center">
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
