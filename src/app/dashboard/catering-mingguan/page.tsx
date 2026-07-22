"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Image as ImageIcon, Utensils, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getMenus, addMenu, deleteMenu, CateringPackage, PricingTier } from "@/lib/firebase/menus";

export default function CateringMingguanAdmin() {
  const [packages, setPackages] = useState<CateringPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  // Menus per day (comma separated strings)
  const [menuInputs, setMenuInputs] = useState({
    senin: "",
    selasa: "",
    rabu: "",
    kamis: "",
    jumat: "",
  });

  // Dynamic pricing
  const [pricing, setPricing] = useState<{ pax: string, price: string }[]>([
    { pax: "1", price: "" },
    { pax: "2", price: "" },
  ]);

  const fetchPackages = async () => {
    setIsLoading(true);
    const data = await getMenus<CateringPackage>("menus_catering");
    setPackages(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleAddPricing = () => {
    setPricing([...pricing, { pax: "", price: "" }]);
  };

  const handleRemovePricing = (index: number) => {
    const newPricing = [...pricing];
    newPricing.splice(index, 1);
    setPricing(newPricing);
  };

  const handlePricingChange = (index: number, field: "pax" | "price", value: string) => {
    const newPricing = [...pricing];
    newPricing[index][field] = value;
    setPricing(newPricing);
  };

  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Process comma separated menus
    const processMenuString = (str: string) => str.split(",").map(s => s.trim()).filter(s => s !== "");
    
    const weeklyMenus = {
      senin: processMenuString(menuInputs.senin),
      selasa: processMenuString(menuInputs.selasa),
      rabu: processMenuString(menuInputs.rabu),
      kamis: processMenuString(menuInputs.kamis),
      jumat: processMenuString(menuInputs.jumat),
    };

    // Process pricing to numbers
    const validPricing: PricingTier[] = pricing
      .filter(p => p.pax !== "" && p.price !== "")
      .map(p => ({
        pax: parseInt(p.pax) || 0,
        price: parseInt(p.price) || 0,
      }))
      .sort((a, b) => a.pax - b.pax);
    
    try {
      await addMenu("menus_catering", {
        name,
        description,
        imageUrl,
        weeklyMenus,
        pricing: validPricing,
      });
      
      // Reset form
      setName("");
      setDescription("");
      setImageUrl("");
      setMenuInputs({ senin: "", selasa: "", rabu: "", kamis: "", jumat: "" });
      setPricing([{ pax: "1", price: "" }, { pax: "2", price: "" }]);
      setShowForm(false);
      
      // Refresh data
      fetchPackages();
    } catch (error) {
      alert("Gagal menambahkan paket. Pastikan koneksi dan Firestore sudah aktif.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus paket ini?")) {
      try {
        await deleteMenu("menus_catering", id);
        fetchPackages();
      } catch (error) {
        alert("Gagal menghapus paket.");
      }
    }
  };

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Menu Catering Mingguan</h1>
          <p className="text-gray-500 mt-1">Kelola paket catering 5 hari (Senin-Jumat) beserta harga per Pax-nya.</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-xl"
        >
          {showForm ? "Batal" : <><Plus size={16} className="mr-2" /> Tambah Paket Mingguan</>}
        </Button>
      </div>

      {showForm && (
        <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-lg">Tambah Paket 5 Hari</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleAddPackage} className="space-y-8">
              
              {/* Section 1: Info Utama */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <span className="bg-[#D4AF37]/20 text-[#D4AF37] w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                  Informasi Utama
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Nama Paket</label>
                    <Input required placeholder="Contoh: Paket Premium (Non MSG)" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">URL Gambar (Opsional)</label>
                    <Input placeholder="https://contoh.com/gambar.jpg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Deskripsi Paket</label>
                    <textarea 
                      required
                      placeholder="Contoh: Paket sehat dengan bahan premium, sayur organik, dan lauk hewani kaya protein."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Menu Harian */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <span className="bg-[#D4AF37]/20 text-[#D4AF37] w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                  Menu Harian (Senin - Jumat)
                </h3>
                <p className="text-xs text-gray-500 mb-2">Pisahkan setiap lauk/menu dengan tanda koma (,). Contoh: <em>Nasi Putih, Ayam Bakar Madu, Sayur Asem, Kerupuk</em></p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {days.map((day) => {
                    const key = day.toLowerCase() as keyof typeof menuInputs;
                    return (
                      <div key={day} className="space-y-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <label className="text-sm font-semibold text-[#005926]">{day}</label>
                        <textarea
                          placeholder={`Menu ${day}...`}
                          value={menuInputs[key]}
                          onChange={(e) => setMenuInputs({ ...menuInputs, [key]: e.target.value })}
                          className="flex min-h-[60px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 3: Harga Bertingkat */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <span className="bg-[#D4AF37]/20 text-[#D4AF37] w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                    Pengaturan Harga per Pax
                  </h3>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddPricing} className="text-xs">
                    + Tambah Harga
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {pricing.map((tier, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-24">
                        <Input 
                          type="number" 
                          min="1"
                          placeholder="Pax" 
                          value={tier.pax} 
                          onChange={(e) => handlePricingChange(index, "pax", e.target.value)} 
                          required
                        />
                      </div>
                      <span className="text-gray-500 font-medium">Pax = Rp</span>
                      <div className="flex-1">
                        <Input 
                          type="number" 
                          placeholder="Harga untuk jumlah pax ini..." 
                          value={tier.price} 
                          onChange={(e) => handlePricingChange(index, "price", e.target.value)} 
                          required
                        />
                      </div>
                      {pricing.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => handleRemovePricing(index)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                          <X size={18} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <Button type="submit" disabled={isSubmitting} className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-xl px-8">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Simpan Paket Catering"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Package List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="p-12 flex justify-center bg-white rounded-2xl shadow-sm border border-gray-100">
            <Loader2 className="w-8 h-8 text-[#005926] animate-spin" />
          </div>
        ) : packages.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Utensils size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Belum ada paket catering</h3>
            <p className="text-gray-500 mt-1">Tambahkan paket catering 5 hari pertama Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 md:p-6 flex flex-col md:flex-row gap-6">
                  {/* Left: Info & Price */}
                  <div className="md:w-1/3 flex flex-col gap-4">
                    <div className="flex gap-4">
                      {pkg.imageUrl ? (
                        <div className="w-20 h-20 rounded-xl flex-shrink-0 overflow-hidden bg-gray-100">
                          <img src={pkg.imageUrl} alt={pkg.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-xl flex-shrink-0 bg-gray-100 flex items-center justify-center">
                          <ImageIcon className="text-gray-400" size={24} />
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{pkg.name}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{pkg.description}</p>
                      </div>
                    </div>
                    
                    <div className="bg-[#005926]/5 rounded-xl p-3 border border-[#005926]/10 mt-auto">
                      <p className="text-xs font-bold text-[#005926] uppercase tracking-wider mb-2">Daftar Harga (5 Hari)</p>
                      <ul className="space-y-1">
                        {pkg.pricing && pkg.pricing.map((tier, idx) => (
                          <li key={idx} className="flex justify-between text-sm">
                            <span className="font-medium text-gray-700">{tier.pax} Pax</span>
                            <span className="font-bold text-gray-900">Rp {tier.price.toLocaleString("id-ID")}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Right: Daily Menus */}
                  <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm font-bold text-gray-800">Menu Harian (Senin - Jumat)</p>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-gray-200 text-gray-600 hover:text-[#005926]">
                          <Pencil size={14} />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(pkg.id)} className="h-8 w-8 rounded-full border-gray-200 text-gray-600 hover:text-red-600 hover:bg-red-50">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                      {days.map((day) => {
                        const key = day.toLowerCase() as keyof typeof pkg.weeklyMenus;
                        const dayMenus = pkg.weeklyMenus ? pkg.weeklyMenus[key] : [];
                        return (
                          <div key={day} className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs font-bold text-[#005926] uppercase mb-2">{day}</p>
                            {dayMenus && dayMenus.length > 0 ? (
                              <ul className="space-y-1 text-sm text-gray-700">
                                {dayMenus.map((m, i) => (
                                  <li key={i} className="flex items-start gap-1.5">
                                    <span className="text-[#D4AF37] mt-0.5">•</span>
                                    <span className="leading-tight">{m}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-xs text-gray-400 italic">Libur / Kosong</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
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
