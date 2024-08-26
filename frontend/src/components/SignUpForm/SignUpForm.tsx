import { useState } from 'react';
import { SignUpFormState } from '../../hooks/useSignUp/useSignUp';
import { useSignUp } from '../../hooks/useSignUp/useSignUp';
import { Button } from '../Button';

const initialFormState: SignUpFormState = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

export const SignUpForm = () => {
  const [formState, setFormState] = useState<SignUpFormState>(initialFormState);
  const { loading, signUp } = useSignUp();
  const canSubmit = Object.values(formState).every((value) => !!value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="label p-2">
          <span className="text-base label-text">Email</span>
        </label>
        <input
          id="email"
          value={formState?.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormState((prev) => ({ ...prev, email: e.target.value }))
          }
          type="email"
          placeholder="email"
          className="w-full input input-bordered h-10"
        />
      </div>
      <div>
        <label htmlFor="userName" className="label p-2">
          <span className="text-base label-text">Name</span>
        </label>
        <input
          id="userName"
          value={formState?.username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormState((prev) => ({ ...prev, username: e.target.value }))
          }
          type="text"
          placeholder="name"
          className="w-full input input-bordered h-10"
        />
      </div>
      <div>
        <label htmlFor="password" className="label p-2">
          <span className="text-base label-text">Password</span>
        </label>
        <input
          id="password"
          value={formState?.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormState((prev) => ({ ...prev, password: e.target.value }))
          }
          type="password"
          placeholder="password"
          className="w-full input input-bordered h-10"
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="label p-2">
          <span className="text-base label-text">Confirm Password</span>
        </label>
        <input
          id="confirmPassword"
          value={formState?.confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormState((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          type="password"
          placeholder="confirm password"
          className="w-full input input-bordered h-10"
        />
      </div>
      <Button
        className="btn btn-block btn-primary btn-sm mt-2"
        loading={loading}
        disabled={!canSubmit}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};
