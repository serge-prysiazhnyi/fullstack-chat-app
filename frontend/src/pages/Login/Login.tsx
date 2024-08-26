import { Link } from 'react-router-dom';
import { LoginForm } from '../../components/LoginForm';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <LoginForm />
      <Link to="/signup" className="p-2 block">{`Don't have an account?`}</Link>
    </div>
  );
};

export default Login;
