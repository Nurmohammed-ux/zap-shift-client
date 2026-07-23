import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    console.log("after login", data);
    const email = data.email;
    const password = data.password;

    console.log(email, password);
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center py-36">
  //       <span className="loading loading-spinner loading-xl text-primary"></span>
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className="md:px-30 px-6 lg:pr-50 pt-8 pb-20 w-full shrink-0">
        <h2 className="text-4xl text-secondary font-extrabold mb-2">
          Welcome Back
        </h2>
        <h4 className="text-xl text-secondary font-medium mb-5">
          Login with ZapShift
        </h4>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <fieldset className="fieldset">
            {/* Email */}
            <label className="label text-base font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
              {...register("email", { required: true })}
              placeholder="Email"
              required
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
            {/* Password */}
            <label className="label text-base font-semibold text-gray-700 my-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
                    message:
                      "Password must contain at least one uppercase, one lowercase, and one special character",
                  },
                })}
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
            {/* Forget password */}
            <div className="my-2">
              <Link className="link text-secondary text-base  underline link-hover">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="btn bg-primary hover:bg-primary/90 border-0 w-full mt-2 text-base font-semibold shadow-md rounded-lg"
            >
              Login
            </button>
          </fieldset>
        </form>
        <p className="text-base mt-4">
          Don’t have any account?{" "}
          <Link to={"/register"} className="text-[#aedb26]">
            Register
          </Link>
        </p>
        <p className="text-center py-3">Or</p>
        {/* Google */}
        <button className="btn bg-gray-200 rounded-lg text-base text-black border-0 w-full">
          <svg
            aria-label="Google logo"
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#EEEEEE"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
