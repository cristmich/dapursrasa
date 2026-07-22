"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, MenuSquare, X, Filter, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getMenus, addMenu, updateMenu, deleteMenu, MenuItem } from "@/lib/firebase/menus";

export default function DaftarMenuAdmin() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modals
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  
  // Filter
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  
  // Form State: Add (Multiple)
  const [newMenus, setNewMenus] = useState([
    { name: "", price: "", category: "Nasi", isActiveToko: true, isActiveNasiBox: true }
  ]);

  // Form State: Edit (Single)
  const [editData, setEditData] = useState({ 
    id: "", 
    name: "", 
    price: "", 
    category: "Nasi",
    isActiveToko: true,
    isActiveNasiBox: true
  });

  const categories = ["Nasi", "Sayur", "Daging", "Ayam", "Ikan", "Udang", "Cumi", "Telor", "Lainnya"];

  const fetchMenus = async () => {
    setIsLoading(true);
    const data = await getMenus("menus_daftarmenu");
    setMenus(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // --- Add Handlers ---
  const handleAddRow = () => {
    setNewMenus([...newMenus, { name: "", price: "", category: "Nasi", isActiveToko: true, isActiveNasiBox: true }]);
  };

  const handleRemoveRow = (index: number) => {
    const updated = [...newMenus];
    updated.splice(index, 1);
    setNewMenus(updated);
  };

  const handleAddChange = (index: number, field: string, value: any) => {
    const updated = [...newMenus];
    updated[index] = { ...updated[index], [field]: value };
    setNewMenus(updated);
  };

  const handleAddMenu = async () => {
    for (let i = 0; i < newMenus.length; i++) {
      if (!newMenus[i].name.trim() || !newMenus[i].price.toString().trim()) {
        return alert(`Baris ke-${i + 1} belum lengkap! Pastikan Nama Menu dan Harga terisi.`);
      }
    }

    setIsSubmitting(true);
    try {
      await Promise.all(
        newMenus.map(menu => 
          addMenu("menus_daftarmenu", {
            name: menu.name,
            price: Number(menu.price),
            category: menu.category,
            isActiveToko: menu.isActiveToko,
            isActiveNasiBox: menu.isActiveNasiBox,
            description: "-",
            imageUrl: "",
          })
        )
      );
      setNewMenus([{ name: "", price: "", category: "Nasi", isActiveToko: true, isActiveNasiBox: true }]);
      setShowAddForm(false);
      fetchMenus();
    } catch (error) {
      alert("Gagal menambahkan menu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Edit Handlers ---
  const handleEditClick = (menu: MenuItem) => {
    setEditData({
      id: menu.id,
      name: menu.name,
      price: menu.price.toString(),
      category: menu.category || "Nasi",
      isActiveToko: menu.isActiveToko ?? true,
      isActiveNasiBox: menu.isActiveNasiBox ?? true,
    });
    setShowEditForm(true);
  };

  const handleUpdateMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData.name.trim() || !editData.price.trim()) {
      return alert("Nama Menu dan Harga wajib diisi!");
    }

    setIsSubmitting(true);
    try {
      await updateMenu("menus_daftarmenu", editData.id, {
        name: editData.name,
        price: Number(editData.price),
        category: editData.category,
        isActiveToko: editData.isActiveToko,
        isActiveNasiBox: editData.isActiveNasiBox,
      });
      setShowEditForm(false);
      fetchMenus();
    } catch (error) {
      alert("Gagal memperbarui menu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Delete Handler ---
  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
      try {
        await deleteMenu("menus_daftarmenu", id);
        fetchMenus();
      } catch (error) {
        alert("Gagal menghapus menu.");
      }
    }
  };

  // Filter Data
  const filteredMenus = selectedCategory === "Semua" 
    ? menus 
    : menus.filter(m => m.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Daftar Menu</h1>
          <p className="text-gray-500 mt-1">Kelola daftar menu satuan, lauk pauk, dan hidangan lainnya.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-8 pr-4 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#005926] focus:border-transparent appearance-none w-full sm:w-auto"
            >
              <option value="Semua">Semua Kategori</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          
          <Button 
            onClick={() => setShowAddForm(true)} 
            className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-xl w-full sm:w-auto"
          >
            <Plus size={16} className="mr-2" /> Tambah Menu
          </Button>
        </div>
      </div>

      {/* MODAL ADD MULTIPLE */}
      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 md:p-6 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900">Tambah Multiple Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-900">
                <X size={20} />
              </Button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <p className="text-sm text-gray-500 mb-4">Anda dapat menambahkan lebih dari satu menu sekaligus.</p>

              {newMenus.map((menu, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-50 p-4 rounded-xl border border-gray-100 relative">
                  <div className="flex-1 w-full space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600">Nama Menu</label>
                    <Input 
                      placeholder="Contoh: Ayam Bakar" 
                      value={menu.name} 
                      onChange={(e) => handleAddChange(index, "name", e.target.value)} 
                    />
                  </div>
                  <div className="w-full md:w-32 space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600">Harga (Rp)</label>
                    <Input 
                      type="number" 
                      placeholder="15000" 
                      value={menu.price} 
                      onChange={(e) => handleAddChange(index, "price", e.target.value)} 
                    />
                  </div>
                  <div className="w-full md:w-36 space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600">Kategori</label>
                    <select 
                      value={menu.category} 
                      onChange={(e) => handleAddChange(index, "category", e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#005926]"
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  
                  {/* Checkboxes for Status */}
                  <div className="flex gap-4 md:flex-col md:gap-2">
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input 
                        type="checkbox" 
                        checked={menu.isActiveToko}
                        onChange={(e) => handleAddChange(index, "isActiveToko", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-[#005926] focus:ring-[#005926]"
                      />
                      <span className="text-gray-700 font-medium">Toko</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input 
                        type="checkbox" 
                        checked={menu.isActiveNasiBox}
                        onChange={(e) => handleAddChange(index, "isActiveNasiBox", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-[#005926] focus:ring-[#005926]"
                      />
                      <span className="text-gray-700 font-medium">Nasi Box</span>
                    </label>
                  </div>

                  {newMenus.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveRow(index)} 
                      className="md:mt-5 text-red-400 hover:text-red-600 hover:bg-red-50 absolute right-2 top-2 md:relative md:top-auto md:right-auto"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              ))}

              <Button type="button" variant="outline" onClick={handleAddRow} className="w-full border-dashed border-2 py-6 text-gray-500 hover:bg-gray-50">
                <Plus size={16} className="mr-2" /> Tambah Baris Baru
              </Button>
            </div>
            
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
              <Button variant="outline" onClick={() => setShowAddForm(false)} disabled={isSubmitting} className="rounded-xl">Batal</Button>
              <Button onClick={handleAddMenu} disabled={isSubmitting} className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-xl px-8">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Simpan Semua Menu"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT SINGLE */}
      {showEditForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 md:p-6 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900">Edit Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowEditForm(false)} className="text-gray-500 hover:text-gray-900">
                <X size={20} />
              </Button>
            </div>
            
            <form onSubmit={handleUpdateMenu} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600">Nama Menu</label>
                <Input 
                  required
                  placeholder="Contoh: Ayam Bakar" 
                  value={editData.name} 
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })} 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600">Harga (Rp)</label>
                <Input 
                  required
                  type="number" 
                  placeholder="Contoh: 15000" 
                  value={editData.price} 
                  onChange={(e) => setEditData({ ...editData, price: e.target.value })} 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600">Kategori</label>
                <select 
                  value={editData.category} 
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#005926]"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-gray-600">Status Menu</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input 
                      type="checkbox" 
                      checked={editData.isActiveToko}
                      onChange={(e) => setEditData({ ...editData, isActiveToko: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-[#005926] focus:ring-[#005926]"
                    />
                    <span className="text-gray-700 font-medium">Aktif di Toko</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input 
                      type="checkbox" 
                      checked={editData.isActiveNasiBox}
                      onChange={(e) => setEditData({ ...editData, isActiveNasiBox: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-[#005926] focus:ring-[#005926]"
                    />
                    <span className="text-gray-700 font-medium">Aktif di Nasi Box</span>
                  </label>
                </div>
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

      {/* Menu Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="w-8 h-8 text-[#005926] animate-spin" />
          </div>
        ) : filteredMenus.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <MenuSquare size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Belum ada menu</h3>
            <p className="text-gray-500 mt-1">
              {selectedCategory === "Semua" ? "Tambahkan item daftar menu pertama Anda." : `Belum ada menu di kategori ${selectedCategory}.`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold whitespace-nowrap">Nama Menu</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Kategori</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Harga</th>
                  <th className="p-4 font-semibold whitespace-nowrap text-center">Status (Toko)</th>
                  <th className="p-4 font-semibold whitespace-nowrap text-center">Status (Nasi Box)</th>
                  <th className="p-4 font-semibold text-right whitespace-nowrap">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredMenus.map((menu) => (
                  <tr key={menu.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-semibold text-gray-900">{menu.name}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                        {menu.category}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-[#005926]">
                      Rp {menu.price.toLocaleString("id-ID")}
                    </td>
                    <td className="p-4 text-center">
                      {(menu.isActiveToko ?? true) ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {(menu.isActiveNasiBox ?? true) ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <Button variant="ghost" size="icon" onClick={() => handleEditClick(menu)} className="h-8 w-8 text-gray-400 hover:text-[#005926] hover:bg-[#005926]/10 rounded-lg">
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(menu.id)} className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 size={14} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
