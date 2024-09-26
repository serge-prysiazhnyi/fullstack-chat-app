import { Link } from 'react-router-dom';
import { SignUpForm } from '../../components/SignUpForm';

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <SignUpForm />
      <Link
        to="/login"
        className="p-2 block text-sky-500 font-medium hover:text-sky-700"
      >{`Already have an account?`}</Link>
    </div>
  );
};

export default SignUp;
