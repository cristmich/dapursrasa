"use client";

import { useState, useEffect } from "react";
import { Loader2, History as HistoryIcon, Calendar } from "lucide-react";
import { getMenus } from "@/lib/firebase/menus";

interface HistoryItem {
  id: string;
  name: string;
  category: string;
  stockIn: number;
  stockOut: number;
}

interface HistoryDoc {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  items: HistoryItem[];
}

export default function HistoryRestoPage() {
  const [histories, setHistories] = useState<HistoryDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getMenus<HistoryDoc>("menus_resto_history");
        // Urutkan dari yang terbaru
        data.sort((a, b) => b.timestamp - a.timestamp);
        setHistories(data);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHistory();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Riwayat Stok Resto</h1>
          <p className="text-gray-500 mt-1">Laporan harian stok masuk dan keluar saat tutup toko.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex justify-center">
          <Loader2 className="w-8 h-8 text-[#005926] animate-spin" />
        </div>
      ) : histories.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <HistoryIcon size={32} />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Belum ada riwayat</h3>
          <p className="text-gray-500 mt-1">
            Riwayat akan muncul setelah Anda melakukan Tutup Toko.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {histories.map((history) => (
            <div key={history.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50/80 p-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-600">
                  <Calendar size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    {formatDate(history.date)}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {history.items.length} Menu
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="p-4 font-semibold whitespace-nowrap text-center w-12">No</th>
                      <th className="p-4 font-semibold whitespace-nowrap">Nama Menu</th>
                      <th className="p-4 font-semibold whitespace-nowrap">Kategori</th>
                      <th className="p-4 font-semibold whitespace-nowrap text-center text-green-700">Stok Masuk</th>
                      <th className="p-4 font-semibold whitespace-nowrap text-center text-red-700">Stok Keluar / Terjual</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {history.items.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 text-center text-gray-500 font-medium">{index + 1}</td>
                        <td className="p-4 font-semibold text-gray-900">{item.name}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                            {item.category}
                          </span>
                        </td>
                        <td className="p-4 text-center font-bold text-green-600">{item.stockIn}</td>
                        <td className="p-4 text-center font-bold text-red-500">{item.stockOut}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
