import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaUpload, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser, signInWithGoogle } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const axiosSecure = useAxiosSecure();
  // console.log(user);

  const { onChange: onPhotoChange, ...photoRegisterRest } = register("photo", {
    required: "Photo is required",
  });

  const handlePhotoChange = (e) => {
    onPhotoChange(e); // keep react-hook-form's validation/state working
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRegistration = (data) => {
    // console.log("after register", data.email);
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const profileImg = data.photo[0];

    createUser(email, password)
      .then(() => {
        // store image in method formdata
        const formData = new FormData();
        formData.append("image", profileImg);
        // create link for post and post in axios method
        const imgbbApi = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;
        axios.post(imgbbApi, formData).then((res) => {
          // console.log("after image upload", res.data.data);
          const photoURL = res.data.data.url;

          // create user in database
          const userInfo = {
            displayName: name,
            email: email,
            photoURL: photoURL,
          };

          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in database");
            }
          });

          // update user
          updateUser(name, photoURL)
            .then(() => navigate(location?.state || "/"))
            .catch((error) => {
              console.log(error.message);
            });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSignUpWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        // create user in database
        const userInfo = {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };

        axiosSecure
          .post("/users", userInfo)
          .then((res) =>
            console.log("user data has been stored in db", res.data),
          );

        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className="md:px-30 px-6 lg:pr-40 pt-8 lg:pt-14 pb-20 w-full shrink-0">
        <h2 className="text-4xl text-secondary font-extrabold mb-2">
          Create an Account
        </h2>
        <h4 className="text-xl text-secondary font-medium mb-5">
          Register with ZapShift
        </h4>
        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          <fieldset className="fieldset">
            {/* Profile Picture Upload Field */}
            <div className="flex flex-col items-start my-4">
              <label
                htmlFor="photo-upload"
                className="cursor-pointer relative group"
              >
                {/* Circular Container */}
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 hover:border-primary transition-all">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative flex items-center justify-center text-gray-400">
                      {/* User Icon */}
                      <FaUser size={45} className="text-gray-300" />
                      {/* Upload Arrow Badge */}
                      <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-md border border-gray-100">
                        <FaUpload size={14} className="text-primary" />
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* Hidden Native File Input bound to React Hook Form */}
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                {...photoRegisterRest}
                onChange={handlePhotoChange}
              />

              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.photo.message}
                </p>
              )}
            </div>
            {/* name */}
            <label className="label text-base font-semibold text-gray-700 my-1">
              Name
            </label>
            <input
              type="text"
              className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
              {...register("name", { required: true })}
              placeholder="Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
            {/* email */}
            <label className="label text-base font-semibold text-gray-700 my-2">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered border border-gray-200 rounded-lg w-full focus:outline-primary"
              {...register("email", { required: true })}
              placeholder="Email"
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

            <button
              type="submit"
              className="btn bg-primary hover:bg-primary/90 border-0 w-full mt-4 text-base font-semibold shadow-md rounded-lg"
            >
              Register
            </button>
          </fieldset>
        </form>
        <p className="text-base mt-4">
          Already have an account?{" "}
          <Link state={location.state} to={"/login"} className="text-[#aedb26]">
            Login
          </Link>
        </p>
        <p className="text-center py-3">Or</p>
        {/* Google */}
        <button
          onClick={handleSignUpWithGoogle}
          className="btn bg-gray-200 rounded-lg text-base text-black border-0 w-full"
        >
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
          Register with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
