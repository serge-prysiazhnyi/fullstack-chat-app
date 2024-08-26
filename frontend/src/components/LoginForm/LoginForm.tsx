import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { LoginFormState } from '../../hooks/useLogin/useLogin';
import { Button } from '../Button';

export const LoginForm = () => {
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
  });

  const { login, loading } = useLogin();
  const canSubmit = Object.values(formState).every((value) => !!value);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ email: formState.email, password: formState.password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="label p-2">
          <span className="text-base label-text">Email</span>
        </label>
        <input
          id="email"
          value={formState.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormState((prev) => ({ ...prev, email: e.target.value }))
          }
          type="email"
          placeholder="email"
          className="w-full input input-bordered h-10"
        />
      </div>
      <div>
        <label htmlFor="password" className="label p-2">
          <span className="text-base label-text">Password</span>
        </label>
        <input
          id="password"
          value={formState.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormState((prev) => ({ ...prev, password: e.target.value }))
          }
          type="password"
          placeholder="password"
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
