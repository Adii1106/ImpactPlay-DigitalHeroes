import React from "react";
import prisma from "@/lib/prisma";

export default async function AdminUsersPage() {
  const users = await prisma.userProfile.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      subscriptions: true,
      _count: { select: { scores: true } }
    }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-neutral-400 mt-2">View and manage all registered users.</p>
      </div>

      <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-neutral-950 border-b border-neutral-800">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Subscription</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Scores</th>
              <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-white">{user.email}</td>
                <td className="px-6 py-4 text-sm font-medium">
                  <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold ${user.role === 'admin' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  {user.subscriptions[0]?.status === 'active' ? (
                     <span className="text-green-500 font-bold uppercase text-[10px]">Active</span>
                  ) : (
                     <span className="text-neutral-500 font-medium uppercase text-[10px]">Inactive</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-neutral-400">{user._count.scores}</td>
                <td className="px-6 py-4 text-sm text-neutral-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
