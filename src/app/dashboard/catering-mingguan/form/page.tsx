"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { getMenu, addMenu, updateMenu, CateringPackage, PricingTier } from "@/lib/firebase/menus";

export default function CateringMingguanForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams?.get("id");

  const [isLoading, setIsLoading] = useState(!!editId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [period, setPeriod] = useState("");
  
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

  useEffect(() => {
    async function loadData() {
      if (!editId) return;
      try {
        const pkg = await getMenu<CateringPackage>("menus_catering", editId);
        if (pkg) {
          setName(pkg.name);
          setPeriod(pkg.period);
          setMenuInputs({
            senin: (pkg.weeklyMenus?.senin || []).join(", "),
            selasa: (pkg.weeklyMenus?.selasa || []).join(", "),
            rabu: (pkg.weeklyMenus?.rabu || []).join(", "),
            kamis: (pkg.weeklyMenus?.kamis || []).join(", "),
            jumat: (pkg.weeklyMenus?.jumat || []).join(", "),
          });
          if (pkg.pricing && pkg.pricing.length > 0) {
            setPricing(pkg.pricing.map(p => ({ pax: p.pax.toString(), price: p.price.toString() })));
          }
        }
      } catch (error) {
        console.error("Error loading package", error);
        alert("Gagal memuat data paket.");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [editId]);

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

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Manual validation
    if (!name.trim()) return alert("Nama paket wajib diisi!");
    if (!period.trim()) return alert("Periode catering wajib diisi!");
    
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

    if (validPricing.length === 0) {
      return alert("Minimal harus ada 1 harga per Pax yang diisi lengkap!");
    }

    setIsSubmitting(true);
    
    try {
      const payload = {
        name,
        period,
        weeklyMenus,
        pricing: validPricing,
      };

      if (editId) {
        await updateMenu("menus_catering", editId, payload);
      } else {
        await addMenu("menus_catering", payload);
      }
      
      router.push("/dashboard/catering-mingguan");
    } catch (error: any) {
      console.error("Error saving package:", error);
      alert(`Gagal menyimpan paket. Error: ${error?.message || "Unknown error"}`);
      setIsSubmitting(false);
    }
  };

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-[#005926] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push("/dashboard/catering-mingguan")} className="rounded-xl shrink-0">
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">
            {editId ? "Edit Paket Mingguan" : "Tambah Paket Mingguan"}
          </h1>
          <p className="text-gray-500 mt-1">Konfigurasi lauk pauk 5 hari dan harga Pax.</p>
        </div>
      </div>

      <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
          <CardTitle className="text-lg">Form Paket Catering</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-8">
            
            {/* Section 1: Info Utama */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <span className="bg-[#D4AF37]/20 text-[#D4AF37] w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                Informasi Utama
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nama Paket</label>
                  <Input placeholder="Contoh: Catering Keluarga" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Periode</label>
                  <Input placeholder="Contoh: 15 Juli - 19 Juli 2024" value={period} onChange={(e) => setPeriod(e.target.value)} />
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

            <div className="flex justify-end pt-4 border-t border-gray-100 gap-3">
              <Button type="button" variant="outline" onClick={() => router.push("/dashboard/catering-mingguan")} className="rounded-xl px-6">
                Batal
              </Button>
              <Button type="button" onClick={() => handleSave()} disabled={isSubmitting} className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-xl px-8">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : editId ? "Simpan Perubahan" : "Simpan Paket Catering"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
