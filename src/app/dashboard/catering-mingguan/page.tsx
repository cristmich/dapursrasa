"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Loader2, Calendar, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getMenus, deleteMenu, CateringPackage } from "@/lib/firebase/menus";

export default function CateringMingguanAdmin() {
  const [packages, setPackages] = useState<CateringPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchPackages = async () => {
    setIsLoading(true);
    const data = await getMenus<CateringPackage>("menus_catering");
    setPackages(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

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
        <Button onClick={() => router.push("/dashboard/catering-mingguan/form")} className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-xl">
          <Plus size={16} className="mr-2" /> Tambah Paket Mingguan
        </Button>
      </div>

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
                    <div className="flex flex-col">
                      <h3 className="font-bold text-xl text-gray-900">{pkg.name}</h3>
                      <div className="inline-flex items-center gap-1.5 mt-2 text-[#005926] bg-[#005926]/10 px-2.5 py-1.5 rounded-lg w-fit">
                        <Calendar size={14} />
                        <p className="text-xs font-semibold">{pkg.period}</p>
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
                        <Button variant="outline" size="icon" onClick={() => router.push(`/dashboard/catering-mingguan/form?id=${pkg.id}`)} className="h-8 w-8 rounded-full border-gray-200 text-gray-600 hover:text-[#005926]">
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
