import { Link } from "react-router";
import error from "../../assets/error.png"

const Error = () => {
  return (
    <div className="flex flex-col mx-6 md:mx-14 rounded-4xl py-20 justify-center bg-white items-center">
        <img src={error} alt="Error 404" />
        <Link to={"/"} className="btn bg-primary border-0 font-semibold text-base px-6 rounded-xl">Go Home</Link>
    </div>
  );
};

export default Error;