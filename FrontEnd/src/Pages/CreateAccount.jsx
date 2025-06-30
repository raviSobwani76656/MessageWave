import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function CreateAccount() {
  const schema = yup.object().shape({
    name: yup.string().required("Please Enter your name"),
    email: yup.string().email().required("Please Enter the email"),
    password: yup
      .string()
      .min(8, "Password should be at least 8 chracters")
      .max(20, "Password should be atmost 20 characters")
      .required("Please Enter your desired password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password Do not Match")
      .required("Please Enter your desired Password"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("submitting thhe form", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-4">
          <input
            className="border border-gray-500 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter the name"
            id="name"
            {...register("name")}
          />
          {errors.name && (
            <span className="absolute top-full left-0 mt-1 text-sm bg-red-500 text-white px-2 py-1 rounded shadow">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="relative mb-4">
          <input
            className="border border-gray-500 rounded  py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter the email"
            id="email"
            {...register("email")}
          />
          {errors.email && (
            <span className="absolute top-full left-0 mt-1 text-sm bg-red-500 text-white px-2 py-1 rounded shadow">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="relative mb-4">
          <input
            className="border border-gray-500 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Enter the password"
            id="password"
            {...register("password")}
          />
          {errors.password && (
            <span className="absolute top-full left-0 mt-1 text-sm bg-red-500 text-white px-2 py-1 rounded shadow">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="relative mb-4">
          <input
            className="border border-gray-500 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            id="confirmPassword"
            placeholder="Confirm your Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="absolute top-full left-0 mt-1 text-sm bg-red-500 text-white px-2 py-1 rounded shadow">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Create Account
        </button>
      </form>
    </>
  );
}

export default CreateAccount;
