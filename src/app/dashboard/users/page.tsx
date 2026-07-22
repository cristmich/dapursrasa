"use client";

import { useState, useEffect } from "react";
import { Loader2, Users, Shield, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUsers, updateUserRole, UserDocument } from "@/lib/firebase/users";

export default function UserManagementAdmin() {
  const [users, setUsers] = useState<UserDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Edit Modal
  const [showEditForm, setShowEditForm] = useState(false);
  const [editData, setEditData] = useState<{ uid: string; email: string; role: string } | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    const data = await getUsers();
    setUsers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user: UserDocument) => {
    setEditData({
      uid: user.uid || user.id || "",
      email: user.email,
      role: user.role || "user"
    });
    setShowEditForm(true);
  };

  const handleUpdateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData) return;
    
    setIsSubmitting(true);
    try {
      await updateUserRole(editData.uid, editData.role);
      setShowEditForm(false);
      fetchUsers();
    } catch (error) {
      alert("Gagal memperbarui hak akses pengguna.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Manajemen Pengguna</h1>
          <p className="text-gray-500 mt-1">Kelola hak akses dan peran (role) pengguna di aplikasi Anda.</p>
        </div>
      </div>

      {/* MODAL EDIT SINGLE */}
      {showEditForm && editData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 md:p-6 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900">Ubah Hak Akses</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowEditForm(false)} className="text-gray-500 hover:text-gray-900">
                <X size={20} />
              </Button>
            </div>
            
            <form onSubmit={handleUpdateRole} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600">Email Pengguna</label>
                <div className="flex h-10 w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm text-gray-500 items-center">
                  {editData.email}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600">Peran (Role)</label>
                <select 
                  value={editData.role} 
                  onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#005926]"
                >
                  <option value="super admin">Super Admin</option>
                  <option value="admin toko">Admin Toko</option>
                  <option value="waiters">Waiters</option>
                  <option value="dapur">Dapur</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowEditForm(false)} disabled={isSubmitting} className="rounded-xl">Batal</Button>
                <Button type="submit" disabled={isSubmitting} className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-xl px-8">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Simpan Perubahan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="w-8 h-8 text-[#005926] animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Users size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Belum ada pengguna</h3>
            <p className="text-gray-500 mt-1">
              Data pengguna akan muncul di sini ketika ada yang mendaftar.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold whitespace-nowrap">Email</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Nama Tampilan</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Hak Akses</th>
                  <th className="p-4 font-semibold text-right whitespace-nowrap">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => {
                  const role = user.role || "waiters"; // default back to waiters or admin toko if undefined
                  return (
                    <tr key={user.uid || user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-semibold text-gray-900">{user.email}</td>
                      <td className="p-4 text-gray-600">
                        {user.displayName || "-"}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wide
                          ${role === 'super admin' || role === 'superadmin' ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 
                            role === 'admin toko' ? 'bg-blue-100 text-blue-700' : 
                            role === 'dapur' ? 'bg-red-100 text-red-700' : 
                            'bg-gray-100 text-gray-600'}`}
                        >
                          {(role === 'super admin' || role === 'superadmin') && <Shield size={12} />}
                          {role}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <Button variant="ghost" size="sm" onClick={() => handleEditClick(user)} className="text-gray-500 hover:text-[#005926] hover:bg-[#005926]/10 rounded-lg">
                          <Pencil size={14} className="mr-1.5" /> Edit Akses
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
