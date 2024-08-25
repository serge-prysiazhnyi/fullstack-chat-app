export const LoginForm = () => {
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
        <button type="submit" className="btn btn-block btn-sm mt-2">
          Submit
        </button>
      </div>
    </form>
  );
};
