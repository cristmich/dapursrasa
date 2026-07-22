"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Image as ImageIcon, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getMenus, addMenu, deleteMenu, MenuItem } from "@/lib/firebase/menus";

export default function NasiBoxAdmin() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("Paket Hemat");

  const fetchMenus = async () => {
    setIsLoading(true);
    const data = await getMenus("menus_nasibox");
    setMenus(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleAddMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addMenu("menus_nasibox", {
        name,
        description,
        price: Number(price),
        imageUrl,
        category,
      });
      
      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
      setCategory("Paket Hemat");
      setShowForm(false);
      
      // Refresh data
      fetchMenus();
    } catch (error) {
      alert("Gagal menambahkan menu. Pastikan koneksi dan Firestore sudah aktif.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
      try {
        await deleteMenu("menus_nasibox", id);
        fetchMenus();
      } catch (error) {
        alert("Gagal menghapus menu.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Menu Nasi Box</h1>
          <p className="text-gray-500 mt-1">Kelola varian paket nasi box untuk berbagai kebutuhan acara.</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-xl"
        >
          {showForm ? "Batal" : <><Plus size={16} className="mr-2" /> Tambah Paket</>}
        </Button>
      </div>

      {showForm && (
        <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-lg">Tambah Paket Baru</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleAddMenu} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nama Paket</label>
                  <Input required placeholder="Contoh: Paket Nasi Gudeg" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Harga (Rp)</label>
                  <Input required type="number" placeholder="Contoh: 35000" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Kategori</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Paket Hemat">Paket Hemat</option>
                    <option value="Paket Standar">Paket Standar</option>
                    <option value="Paket Premium">Paket Premium</option>
                    <option value="Paket Spesial">Paket Spesial</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">URL Gambar (Opsional)</label>
                  <Input placeholder="https://contoh.com/gambar.jpg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Deskripsi / Isi Paket</label>
                <textarea 
                  required
                  placeholder="Contoh: Nasi Putih, Gudeg, Ayam Kampung, Krecek, Telur Pindang, Sambal, Kerupuk."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={isSubmitting} className="bg-[#D4AF37] hover:bg-[#b0902c] text-white rounded-xl">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Simpan Paket"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Menu List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <Loader2 className="w-8 h-8 text-[#005926] animate-spin" />
          </div>
        ) : menus.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Package size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Belum ada paket</h3>
            <p className="text-gray-500 mt-1">Tambahkan paket nasi box pertama Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {menus.map((menu) => (
              <div key={menu.id} className="p-5 border border-gray-100 rounded-xl hover:border-[#005926]/30 transition-colors bg-white shadow-sm hover:shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wide">
                    {menu.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#005926]">
                      <Pencil size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(menu.id)} className="h-8 w-8 text-gray-400 hover:text-red-600">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
                    {menu.imageUrl ? (
                      <img src={menu.imageUrl} alt={menu.name} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="text-gray-400" size={24} />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{menu.name}</h4>
                    <p className="text-[#005926] font-semibold mb-2">Rp {menu.price.toLocaleString("id-ID")}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{menu.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
