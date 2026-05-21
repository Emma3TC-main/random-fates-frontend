import AdminLayout from "../layouts/AdminLayout";

function AdminGames() {
  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">Games Management</h1>

        <p className="mt-2 text-slate-400">
          Monitor all active and completed games.
        </p>
      </div>

      <div className="rounded-3xl border border-cyan-500/10 bg-slate-900 p-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 text-left text-slate-400">
              <th className="pb-4">Game</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Players</th>
              <th className="pb-4">Winner</th>
            </tr>
          </thead>

          <tbody className="text-white">
            <tr className="border-b border-slate-800">
              <td className="py-5">Roulette #1023</td>
              <td className="py-5 text-green-400">RUNNING</td>
              <td className="py-5">248</td>
              <td className="py-5">Pending</td>
            </tr>

            <tr className="border-b border-slate-800">
              <td className="py-5">Slots #445</td>
              <td className="py-5 text-green-400">RUNNING</td>
              <td className="py-5">91</td>
              <td className="py-5">Pending</td>
            </tr>

            <tr>
              <td className="py-5">Random #712</td>
              <td className="py-5 text-cyan-400">COMPLETED</td>
              <td className="py-5">431</td>
              <td className="py-5">Emma</td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default AdminGames;
