import { LoginForm } from '../../components/LoginForm';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <LoginForm />
      {/* ToDo Link */}
      <a href="#" className="p-2 block">{`Don't have an account`}</a>
    </div>
  );
};

export default Login;
