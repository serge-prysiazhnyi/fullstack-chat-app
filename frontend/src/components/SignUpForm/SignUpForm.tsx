export const SignUpForm = () => {
  return (
    <form>
      <div>
        <label htmlFor="email" className="label p-2">
          <span className="text-base label-text">Email</span>
        </label>
        <input
          id="email"
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
          type="password"
          placeholder="confirm password"
          className="w-full input input-bordered h-10"
        />
      </div>
      <div>
        <button type="submit" className="btn btn-block btn-sm mt-2">
          Submit
        </button>
      </div>
    </form>
  );
};
