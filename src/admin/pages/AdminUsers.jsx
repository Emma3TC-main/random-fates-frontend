import AdminLayout from "../layouts/AdminLayout";

function AdminUsers() {
  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">Users</h1>

        <p className="mt-2 text-slate-400">
          Manage platform users and permissions.
        </p>
      </div>

      <div className="rounded-3xl border border-cyan-500/10 bg-slate-900 p-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 text-left text-slate-400">
              <th className="pb-4">User</th>
              <th className="pb-4">Role</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Games</th>
            </tr>
          </thead>

          <tbody className="text-white">
            <tr className="border-b border-slate-800">
              <td className="py-5">Emma</td>
              <td className="py-5 text-cyan-400">Admin</td>
              <td className="py-5 text-green-400">Active</td>
              <td className="py-5">182</td>
            </tr>

            <tr className="border-b border-slate-800">
              <td className="py-5">Carlos</td>
              <td className="py-5">Moderator</td>
              <td className="py-5 text-green-400">Active</td>
              <td className="py-5">53</td>
            </tr>

            <tr>
              <td className="py-5">Lucia</td>
              <td className="py-5">User</td>
              <td className="py-5 text-yellow-400">Idle</td>
              <td className="py-5">11</td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default AdminUsers;
