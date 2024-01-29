import Link from "next/link";
import { handleLogin } from "@/actions/user";

export default function Login() {
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src="/loginLogo.png" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

          <form className="mt-6" action={handleLogin}>
            <div>
              <label className="block text-gray-700">Username</label>
              <input type="text" name="username" id="email-input" placeholder="Enter Username" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-slate-500 focus:bg-white" autoFocus autoComplete="on" required />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input type="password" name="password" id="password-input" placeholder="Enter Password" minLength={5} className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-slate-500 focus:bg-white" required />
            </div>

            <div className="text-right mt-2">
              <a href="#" className="text-sm font-semibold text-blue-500 hover:text-blue-700 focus:text-blue-700">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="w-full block bg-slate-500 hover:bg-slate-700 focus:bg-slate-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">
              Log In
            </button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          <p className="mt-8">
            Need an account?{" "}
            <Link href="/register" className="text-blue-500 hover:text-blue-700 font-semibold">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
