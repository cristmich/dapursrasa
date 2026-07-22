"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getMenus, deleteMenu, ArticleItem } from "@/lib/firebase/menus";
import Image from "next/image";

export default function ArtikelAdmin() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticles = async () => {
    setIsLoading(true);
    const data = await getMenus<ArticleItem>("articles");
    setArticles(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      try {
        await deleteMenu("articles", id);
        fetchArticles();
      } catch (error) {
        alert("Gagal menghapus artikel.");
      }
    }
  };

  const formatDate = (date: any) => {
    if (!date) return "-";
    // Check if it's a firebase timestamp
    let d = new Date();
    if (date.seconds) {
      d = new Date(date.seconds * 1000);
    } else {
      d = new Date(date);
    }
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Artikel & Blog</h1>
          <p className="text-gray-500 mt-1">Kelola konten artikel dan informasi terbaru untuk website.</p>
        </div>
        <Button render={<Link href="/dashboard/artikel/form" />} className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-xl">
          <Plus size={16} className="mr-2" /> Tulis Artikel
        </Button>
      </div>

      {/* Article List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="p-12 flex justify-center bg-white rounded-2xl shadow-sm border border-gray-100">
            <Loader2 className="w-8 h-8 text-[#005926] animate-spin" />
          </div>
        ) : articles.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <FileText size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Belum ada artikel</h3>
            <p className="text-gray-500 mt-1">Tulis artikel pertama Anda untuk pengunjung website.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                {/* Image Cover */}
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden group">
                  {article.imageUrl ? (
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <FileText size={48} className="opacity-20" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-lg shadow-sm backdrop-blur-md ${article.status === 'Published' ? 'bg-green-500/90 text-white' : 'bg-yellow-400/90 text-yellow-950'}`}>
                      {article.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-xs font-medium text-gray-500 mb-2">{formatDate(article.createdAt)}</p>
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-snug">{article.title}</h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-3 leading-relaxed flex-1">
                    {article.content}
                  </p>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-gray-100">
                    <Button variant="outline" size="sm" asChild className="rounded-xl border-gray-200 text-gray-600 hover:text-[#005926]">
                      <Link href={`/dashboard/artikel/form?id=${article.id}`}>
                        <Pencil size={14} className="mr-1.5" /> Edit
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(article.id)} className="rounded-xl border-gray-200 text-gray-600 hover:text-red-600 hover:bg-red-50">
                      <Trash2 size={14} className="mr-1.5" /> Hapus
                    </Button>
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
