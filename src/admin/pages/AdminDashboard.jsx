import { Activity, Users, Trophy, Gamepad2 } from "lucide-react";

import AdminLayout from "../layouts/AdminLayout";

import StatCard from "../components/StatCard";
import GameStatusCard from "../components/GameStatusCard";

function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>

        <p className="mt-2 text-slate-400">
          Monitor system activity and games in real time.
        </p>
      </div>

      <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Active Games" value="24" icon={Gamepad2} />

        <StatCard title="Users Online" value="1,284" icon={Users} />

        <StatCard title="Completed Raffles" value="392" icon={Trophy} />

        <StatCard title="System Status" value="99.9%" icon={Activity} />
      </div>

      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Live Games</h2>

          <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">
            LIVE MONITORING
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <GameStatusCard
            game="Roulette #1023"
            status="RUNNING"
            participants="248"
            winner="Pending"
          />

          <GameStatusCard
            game="Slots #445"
            status="RUNNING"
            participants="91"
            winner="Pending"
          />

          <GameStatusCard
            game="Random #712"
            status="COMPLETED"
            participants="431"
            winner="Emma"
          />
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
