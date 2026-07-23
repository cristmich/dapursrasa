"use client";

import { useState, useEffect } from "react";
import { Loader2, Users, Shield, Pencil, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUsers, updateUser, createUser, UserDocument } from "@/lib/firebase/users";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserManagementAdmin() {
  const [users, setUsers] = useState<UserDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Edit Modal
  const [showEditForm, setShowEditForm] = useState(false);
  const [editData, setEditData] = useState<{ uid: string; email: string; displayName: string; role: string } | null>(null);

  // Add Modal
  const [showAddForm, setShowAddForm] = useState(false);
  const [addData, setAddData] = useState({ email: "", password: "", displayName: "", role: "waiters" });

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
      displayName: user.displayName || "",
      role: user.role || "waiters"
    });
    setShowEditForm(true);
    setErrorMsg("");
  };

  const handleAddClick = () => {
    setAddData({ email: "", password: "", displayName: "", role: "waiters" });
    setShowAddForm(true);
    setErrorMsg("");
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData) return;
    
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      await updateUser(editData.uid, {
        displayName: editData.displayName,
        role: editData.role
      });
      setShowEditForm(false);
      fetchUsers();
    } catch (error: any) {
      setErrorMsg(error.message || "Gagal memperbarui data pengguna.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    
    try {
      await createUser(addData.email, addData.password, addData.displayName, addData.role);
      setShowAddForm(false);
      fetchUsers();
    } catch (error: any) {
      setErrorMsg(error.message || "Gagal menambahkan pengguna.");
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
        <Button onClick={handleAddClick} className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-xl">
          <Plus size={18} className="mr-2" /> Tambah Pengguna
        </Button>
      </div>

      {/* MODAL EDIT SINGLE */}
      {showEditForm && editData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 md:p-6 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900">Edit Pengguna</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowEditForm(false)} className="text-gray-500 hover:text-gray-900">
                <X size={20} />
              </Button>
            </div>
            
            <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
              {errorMsg && <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">{errorMsg}</div>}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-600">Email Pengguna (Tidak dapat diubah)</Label>
                <div className="flex h-10 w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm text-gray-500 items-center">
                  {editData.email}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="displayName" className="text-xs font-semibold text-gray-600">Nama Tampilan</Label>
                <Input 
                  id="displayName"
                  value={editData.displayName} 
                  onChange={(e) => setEditData({ ...editData, displayName: e.target.value })}
                  className="rounded-md border-input bg-white"
                  placeholder="Nama Pengguna"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-600">Peran (Role)</Label>
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

      {/* MODAL ADD */}
      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 md:p-6 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900">Tambah Pengguna</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-900">
                <X size={20} />
              </Button>
            </div>
            
            <form onSubmit={handleAddUser} className="p-6 space-y-4 overflow-y-auto">
              {errorMsg && <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">{errorMsg}</div>}
              
              <div className="space-y-1.5">
                <Label htmlFor="addEmail" className="text-xs font-semibold text-gray-600">Email Login</Label>
                <Input 
                  id="addEmail"
                  type="email"
                  value={addData.email} 
                  onChange={(e) => setAddData({ ...addData, email: e.target.value })}
                  className="rounded-md border-input bg-white"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="addPassword" className="text-xs font-semibold text-gray-600">Password</Label>
                <Input 
                  id="addPassword"
                  type="password"
                  value={addData.password} 
                  onChange={(e) => setAddData({ ...addData, password: e.target.value })}
                  className="rounded-md border-input bg-white"
                  placeholder="Minimal 6 karakter"
                  required
                  minLength={6}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="addName" className="text-xs font-semibold text-gray-600">Nama Tampilan</Label>
                <Input 
                  id="addName"
                  value={addData.displayName} 
                  onChange={(e) => setAddData({ ...addData, displayName: e.target.value })}
                  className="rounded-md border-input bg-white"
                  placeholder="Nama Lengkap"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-600">Peran (Role)</Label>
                <select 
                  value={addData.role} 
                  onChange={(e) => setAddData({ ...addData, role: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#005926]"
                >
                  <option value="super admin">Super Admin</option>
                  <option value="admin toko">Admin Toko</option>
                  <option value="waiters">Waiters</option>
                  <option value="dapur">Dapur</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)} disabled={isSubmitting} className="rounded-xl">Batal</Button>
                <Button type="submit" disabled={isSubmitting} className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-xl px-8">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Tambah Akun"}
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
                  const role = user.role || "waiters";
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
                          <Pencil size={14} className="mr-1.5" /> Edit
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
