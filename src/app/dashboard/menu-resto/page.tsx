"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Coffee, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getMenus, addMenu, updateMenu, deleteMenu, MenuItem, MenuRestoItem } from "@/lib/firebase/menus";

export default function MenuRestoAdmin() {
  const [menus, setMenus] = useState<MenuRestoItem[]>([]);
  const [daftarMenus, setDaftarMenus] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Status Toko
  const [isShopOpen, setIsShopOpen] = useState(true);
  const [statusDocId, setStatusDocId] = useState<string | null>(null);
  const [lastClosedDate, setLastClosedDate] = useState<string | null>(null);
  
  // Modals
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  
  // Filter
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  
  // Form State: Add (Multiple)
  const [newMenus, setNewMenus] = useState([
    { daftarMenuId: "", name: "", price: "", category: "Makanan Utama", stockIn: 0 }
  ]);

  const [editData, setEditData] = useState({ 
    id: "", 
    name: "", 
    price: "", 
    category: "Makanan Utama", 
    currentStockIn: 0, 
    currentStockOut: 0,
    addStockIn: 0,
    addStockOut: 0
  });

  const categories = ["Makanan Utama", "Minuman", "Snack", "Dessert", "Paket", "Lainnya"];

  const fetchData = async () => {
    setIsLoading(true);
    const [restoData, masterData, statusDocs] = await Promise.all([
      getMenus<MenuRestoItem>("menus_resto"),
      getMenus<MenuItem>("menus_daftarmenu"),
      getMenus<any>("resto_status")
    ]);
    setMenus(restoData);
    setDaftarMenus(masterData);
    
    if (statusDocs.length > 0) {
      setIsShopOpen(statusDocs[0].isShopOpen ?? true);
      setStatusDocId(statusDocs[0].id);
      setLastClosedDate(statusDocs[0].lastClosedDate || null);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAddForm = () => {
    const activeMenus = daftarMenus.filter(m => m.isActiveToko !== false);

    if (activeMenus.length === 0) {
      alert("Tidak ada menu yang aktif di toko pada Daftar Menu.");
      return;
    }

    const prefilled = activeMenus.map(m => {
      const existingRestoItem = menus.find(rm => rm.daftarMenuId === m.id);
      return {
        daftarMenuId: m.id,
        name: existingRestoItem ? existingRestoItem.name : m.name,
        price: existingRestoItem ? existingRestoItem.price.toString() : m.price.toString(),
        category: existingRestoItem ? existingRestoItem.category : (m.category || "Makanan Utama"),
        stockIn: 0
      };
    });

    setNewMenus(prefilled);
    setShowAddForm(true);
  };

  const handleTutupTokoClick = () => {
    if (menus.length === 0) {
      alert("Belum ada menu di resto.");
      return;
    }
    const yes = confirm("Tutup toko untuk hari ini?\n\nSemua sisa stok akan otomatis dinolkan (dianggap habis).");
    if (yes) {
      handleTutupTokoSubmit();
    }
  };

  const handleTutupTokoSubmit = async () => {
    setIsSubmitting(true);
    const todayStr = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' });
    
    // Siapkan data history
    const historyData = {
      date: todayStr,
      timestamp: new Date().getTime(),
      items: menus.map(m => ({
        id: m.id,
        name: m.name,
        category: m.category || "Lainnya",
        stockIn: m.stockIn || 0,
        stockOut: m.stockIn || 0 // Karena sisa stok dibuat 0, stok keluar = stok masuk
      }))
    };

    try {
      await Promise.all([
        addMenu("menus_resto_history", historyData),
        ...menus.map(m => updateMenu("menus_resto", m.id, { stockOut: m.stockIn || 0 })),
        statusDocId 
          ? updateMenu("resto_status", statusDocId, { isShopOpen: false, lastClosedDate: todayStr })
          : addMenu("resto_status", { isShopOpen: false, lastClosedDate: todayStr })
      ]);
      fetchData();
      alert("Toko berhasil ditutup dan semua sisa stok telah dinolkan!");
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan data tutup toko.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBukaToko = async () => {
    const todayStr = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' });
    
    if (lastClosedDate === todayStr) {
      alert("Toko sudah ditutup untuk hari ini! Anda baru bisa membuka toko kembali besok hari.");
      return;
    }
    
    const wantToOpen = confirm("Buka toko untuk hari ini?\n\nStok dari hari sebelumnya akan direset menjadi 0 untuk memulai hari yang baru.");
    if (!wantToOpen) return;
    
    setIsSubmitting(true);
    try {
      const promises: Promise<any>[] = [];
      
      // Reset stok untuk hari baru
      menus.forEach(m => {
        promises.push(updateMenu("menus_resto", m.id, { stockIn: 0, stockOut: 0 }));
      });
      
      if (statusDocId) {
        promises.push(updateMenu("resto_status", statusDocId, { isShopOpen: true }));
      } else {
        promises.push(addMenu("resto_status", { isShopOpen: true }));
      }
      
      await Promise.all(promises);
      fetchData();
      alert("Toko berhasil dibuka!");
    } catch(e) {
      alert("Gagal membuka toko.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddChange = (index: number, field: string, value: any) => {
    const updated = [...newMenus];
    updated[index] = { ...updated[index], [field]: value };
    setNewMenus(updated);
  };

  const handleAddMenu = async () => {
    for (let i = 0; i < newMenus.length; i++) {
      if (!newMenus[i].name.trim() || !newMenus[i].price.toString().trim()) {
        return alert(`Baris ke-${i + 1} belum lengkap! Pastikan Menu (Nama) dan Harga terisi.`);
      }
    }

    setIsSubmitting(true);
    try {
      await Promise.all(
        newMenus.map(menu => {
          const addedStock = Number(menu.stockIn) || 0;
          const existingRestoItem = menus.find(rm => rm.daftarMenuId === menu.daftarMenuId);

          if (existingRestoItem) {
            if (addedStock <= 0) return Promise.resolve();
            return updateMenu("menus_resto", existingRestoItem.id, {
              name: menu.name,
              price: Number(menu.price),
              category: menu.category,
              stockIn: (existingRestoItem.stockIn || 0) + addedStock
            });
          } else {
            return addMenu("menus_resto", {
              daftarMenuId: menu.daftarMenuId,
              name: menu.name,
              price: Number(menu.price),
              category: menu.category,
              stockIn: addedStock,
              stockOut: 0,
            });
          }
        })
      );
      setNewMenus([{ daftarMenuId: "", name: "", price: "", category: "Makanan Utama", stockIn: 0 }]);
      setShowAddForm(false);
      fetchData();
    } catch (error) {
      alert("Gagal menambahkan menu resto.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Edit Handlers ---
  const handleEditClick = (menu: MenuRestoItem) => {
    setEditData({
      id: menu.id,
      name: menu.name,
      price: menu.price.toString(),
      category: menu.category || "Makanan Utama",
      currentStockIn: menu.stockIn || 0,
      currentStockOut: menu.stockOut || 0,
      addStockIn: 0,
      addStockOut: 0
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
      await updateMenu("menus_resto", editData.id, {
        name: editData.name,
        price: Number(editData.price),
        category: editData.category,
        stockIn: editData.currentStockIn + Number(editData.addStockIn),
        stockOut: editData.currentStockOut + Number(editData.addStockOut),
      });
      setShowEditForm(false);
      fetchData();
    } catch (error) {
      alert("Gagal memperbarui menu resto.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Delete Handler ---
  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
      try {
        await deleteMenu("menus_resto", id);
        fetchData();
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
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Menu Resto & Stok</h1>
          <p className="text-gray-500 mt-1">Kelola daftar menu untuk Dine In / Resto serta pelacakan stok porsi.</p>
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
          
          {!isShopOpen && (
            <div className="px-4 py-2 bg-red-100 text-red-700 font-bold rounded-xl text-sm border border-red-200">
              Toko Sedang Tutup
            </div>
          )}

          {isShopOpen ? (
            <>
              <Button 
                onClick={handleTutupTokoClick} 
                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl w-full sm:w-auto"
              >
                Tutup Toko
              </Button>
              <Button 
                onClick={handleOpenAddForm} 
                className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-xl w-full sm:w-auto"
              >
                <Plus size={16} className="mr-2" /> Tambah Menu & Stok
              </Button>
            </>
          ) : (
            <Button 
              onClick={handleBukaToko} 
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl w-full sm:w-auto font-bold px-8"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Buka Toko"}
            </Button>
          )}
        </div>
      </div>

      {/* MODAL ADD MULTIPLE */}
      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 md:p-6 backdrop-blur-sm">
          <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900">Tambah Menu Resto (Dari Daftar Menu)</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-900">
                <X size={20} />
              </Button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <p className="text-sm text-gray-500 mb-4">Berikut adalah semua menu yang aktif di toko. Silakan input stok masuknya. <b>Jika menu sudah ada di tabel, stok barunya akan ditambahkan (diakumulasi) ke stok lama.</b> Biarkan 0 jika belum ada stok tambahan.</p>

              {newMenus.map((menu, index) => (
                <div key={index} className="flex flex-col lg:flex-row gap-3 items-start lg:items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                  
                  <div className="flex-1 w-full space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600">Nama Menu</label>
                    <div className="flex h-10 w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm text-gray-700 items-center">
                      {menu.name}
                    </div>
                  </div>

                  <div className="w-full lg:w-32 space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600">Harga (Rp)</label>
                    <div className="flex h-10 w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm text-gray-700 items-center">
                      {Number(menu.price).toLocaleString("id-ID")}
                    </div>
                  </div>

                  <div className="w-full lg:w-32 space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600">Kategori</label>
                    <div className="flex h-10 w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm text-gray-700 items-center">
                      {menu.category}
                    </div>
                  </div>

                  <div className="w-full lg:w-32 space-y-1.5">
                    <label className="text-xs font-semibold text-green-600">Stok Masuk</label>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      min="0"
                      value={menu.stockIn} 
                      onChange={(e) => handleAddChange(index, "stockIn", e.target.value)} 
                      className="border-green-200 focus-visible:ring-green-500 font-bold text-green-700"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
              <Button variant="outline" onClick={() => setShowAddForm(false)} disabled={isSubmitting} className="rounded-xl">Batal</Button>
              <Button onClick={handleAddMenu} disabled={isSubmitting} className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-xl px-8">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Simpan Menu & Stok"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT SINGLE (STOK & INFO) */}
      {showEditForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 md:p-6 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900">Kelola Menu & Stok</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowEditForm(false)} className="text-gray-500 hover:text-gray-900">
                <X size={20} />
              </Button>
            </div>
            
            <form onSubmit={handleUpdateMenu} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600">Nama Menu</label>
                <Input 
                  required
                  placeholder="Contoh: Nasi Goreng" 
                  value={editData.name} 
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })} 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600">Harga (Rp)</label>
                <Input 
                  required
                  type="number" 
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

              <div className="pt-2 pb-1">
                <hr className="border-gray-100" />
              </div>
              <p className="text-xs text-gray-500 mb-2">Input angka di bawah untuk <b>menambah</b> jumlah stok (bukan mengganti totalnya). Biarkan 0 jika tidak ada penambahan.</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-semibold text-green-600">Tambah Stok Masuk</label>
                    <span className="text-[10px] text-gray-400">Total skrg: {editData.currentStockIn}</span>
                  </div>
                  <Input 
                    type="number" 
                    min="0"
                    value={editData.addStockIn} 
                    onChange={(e) => setEditData({ ...editData, addStockIn: Number(e.target.value) })} 
                    className="border-green-200 focus-visible:ring-green-500"
                  />
                  <p className="text-[10px] text-green-600/80">Nanti menjadi: {editData.currentStockIn + (Number(editData.addStockIn) || 0)}</p>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-semibold text-red-600">Tambah Stok Keluar</label>
                    <span className="text-[10px] text-gray-400">Total skrg: {editData.currentStockOut}</span>
                  </div>
                  <Input 
                    type="number" 
                    min="0"
                    value={editData.addStockOut} 
                    onChange={(e) => setEditData({ ...editData, addStockOut: Number(e.target.value) })} 
                    className="border-red-200 focus-visible:ring-red-500"
                  />
                  <p className="text-[10px] text-red-600/80">Nanti menjadi: {editData.currentStockOut + (Number(editData.addStockOut) || 0)}</p>
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
              <Coffee size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Belum ada menu resto</h3>
            <p className="text-gray-500 mt-1">
              {selectedCategory === "Semua" ? "Tambahkan item menu resto dari Daftar Menu." : `Belum ada menu di kategori ${selectedCategory}.`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold whitespace-nowrap text-center w-12">No</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Nama Menu</th>
                  <th className="p-4 font-semibold whitespace-nowrap">Kategori</th>
                  <th className="p-4 font-semibold whitespace-nowrap text-center">Harga</th>
                  <th className="p-4 font-semibold whitespace-nowrap text-center">Stok Masuk</th>
                  <th className="p-4 font-semibold whitespace-nowrap text-center">Stok Keluar</th>
                  <th className="p-4 font-semibold whitespace-nowrap text-center text-[#005926]">Sisa Stok</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredMenus.map((menu, index) => {
                  const sisaStok = (menu.stockIn || 0) - (menu.stockOut || 0);
                  return (
                    <tr key={menu.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 text-center text-gray-500 font-medium">{index + 1}</td>
                      <td className="p-4 font-semibold text-gray-900">{menu.name}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                          {menu.category}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-center text-gray-700">
                        Rp {menu.price.toLocaleString("id-ID")}
                      </td>
                      <td className="p-4 text-center font-bold text-green-600">{menu.stockIn || 0}</td>
                      <td className="p-4 text-center font-bold text-red-500">{menu.stockOut || 0}</td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center justify-center min-w-[32px] h-8 rounded-lg text-sm font-bold ${sisaStok > 10 ? 'bg-green-100 text-green-700' : sisaStok > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          {sisaStok}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
