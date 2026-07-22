"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getMenu, addMenu, updateMenu, ArticleItem } from "@/lib/firebase/menus";
import Image from "next/image";

export default function ArtikelForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams?.get("id");

  const [isLoading, setIsLoading] = useState(!!editId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<"Draft" | "Published">("Published");

  useEffect(() => {
    async function loadData() {
      if (!editId) return;
      try {
        const article = await getMenu<ArticleItem>("articles", editId);
        if (article) {
          setTitle(article.title || "");
          setContent(article.content || "");
          setImageUrl(article.imageUrl || "");
          setStatus(article.status || "Published");
        }
      } catch (error) {
        console.error("Error loading article", error);
        alert("Gagal memuat data artikel.");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [editId]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!title.trim()) return alert("Judul artikel wajib diisi!");
    if (!content.trim()) return alert("Isi artikel wajib diisi!");

    setIsSubmitting(true);
    
    try {
      const payload: Omit<ArticleItem, 'id' | 'createdAt'> = {
        title,
        content,
        imageUrl,
        status,
      };

      if (editId) {
        await updateMenu("articles", editId, payload);
      } else {
        await addMenu("articles", payload);
      }
      
      router.push("/dashboard/artikel");
    } catch (error: any) {
      console.error("Error saving article:", error);
      alert(`Gagal menyimpan artikel. Error: ${error?.message || "Unknown error"}`);
      setIsSubmitting(false);
    }
  };

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
        <Button variant="outline" size="icon" onClick={() => router.push("/dashboard/artikel")} className="rounded-xl shrink-0">
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">
            {editId ? "Edit Artikel" : "Tulis Artikel Baru"}
          </h1>
          <p className="text-gray-500 mt-1">Publikasikan informasi atau promosi untuk pelanggan.</p>
        </div>
      </div>

      <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
          <CardTitle className="text-lg">Form Artikel</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSave} className="space-y-8">
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Judul Artikel <span className="text-red-500">*</span></label>
                <Input 
                  required
                  placeholder="Contoh: Promo Spesial Bulan Ini!" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="text-lg font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Status Publikasi</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "Draft" | "Published")}
                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#005926]"
                  >
                    <option value="Published">Published (Langsung Tayang)</option>
                    <option value="Draft">Draft (Simpan Sementara)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">URL Gambar Cover (Opsional)</label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="https://..." 
                      value={imageUrl} 
                      onChange={(e) => setImageUrl(e.target.value)} 
                    />
                  </div>
                </div>
              </div>

              {imageUrl && (
                <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border border-gray-200">
                  <Image src={imageUrl} alt="Preview Cover" fill className="object-cover" />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Isi Artikel <span className="text-red-500">*</span></label>
                <textarea
                  required
                  rows={15}
                  placeholder="Ketik isi artikel di sini..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100 gap-3">
              <Button type="button" variant="outline" onClick={() => router.push("/dashboard/artikel")} className="rounded-xl px-6">
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-xl px-8">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : editId ? "Simpan Perubahan" : "Tayangkan Artikel"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
