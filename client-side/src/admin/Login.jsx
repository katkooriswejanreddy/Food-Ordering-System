export default function AdminLogin() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900">

      <div className="card p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-md mb-4 dark:bg-slate-800 dark:border-slate-700"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-md mb-6 dark:bg-slate-800 dark:border-slate-700"
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md">
          Login
        </button>
      </div>

    </div>
  );
}
