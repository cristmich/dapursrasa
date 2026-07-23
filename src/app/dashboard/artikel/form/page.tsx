"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ArrowLeft, UploadCloud, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getMenu, addMenu, updateMenu, ArticleItem } from "@/lib/firebase/menus";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/config";

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export default function ArtikelForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams?.get("id");

  const [isLoading, setIsLoading] = useState(!!editId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<"Draft" | "Published">("Published");

  // SEO State
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");

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
          setMetaTitle(article.metaTitle || "");
          setMetaDescription(article.metaDescription || "");
          setMetaKeyword(article.metaKeyword || "");
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileRef = ref(storage, `articles/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setImageUrl(url);
    } catch (error: any) {
      console.error("Error uploading image:", error);
      alert("Gagal mengunggah gambar. Pastikan format sesuai dan tidak terlalu besar.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!title.trim()) return alert("Judul artikel wajib diisi!");
    if (!content.trim() || content === "<p><br></p>") return alert("Isi artikel wajib diisi!");

    setIsSubmitting(true);
    
    try {
      const payload: Omit<ArticleItem, 'id' | 'createdAt'> = {
        title,
        content,
        imageUrl,
        status,
        metaTitle,
        metaDescription,
        metaKeyword
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
    <div className="space-y-6 max-w-4xl pb-10">
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

      <form onSubmit={handleSave} className="space-y-6">
        {/* Main Form Card */}
        <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-lg">Konten Utama</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Judul Artikel <span className="text-red-500">*</span></label>
              <Input 
                required
                placeholder="Contoh: Promo Spesial Bulan Ini!" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="text-lg font-semibold h-12"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status Publikasi</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "Draft" | "Published")}
                  className="flex h-11 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#005926]"
                >
                  <option value="Published">Published (Langsung Tayang)</option>
                  <option value="Draft">Draft (Simpan Sementara)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Gambar Cover</label>
                <div className="flex items-center gap-4">
                  <label className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition-colors cursor-pointer hover:bg-gray-100 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                    {isUploading ? "Mengunggah..." : "Pilih File Gambar"}
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden" 
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Image Preview */}
            {imageUrl && (
              <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border border-gray-200">
                <Image src={imageUrl} alt="Preview Cover" fill className="object-cover" />
                <Button 
                  type="button" 
                  variant="destructive" 
                  size="sm" 
                  className="absolute top-2 right-2 rounded-lg"
                  onClick={() => setImageUrl("")}
                >
                  Hapus Gambar
                </Button>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Isi Artikel <span className="text-red-500">*</span></label>
              <div className="bg-white rounded-md border border-input min-h-[350px] flex flex-col overflow-hidden [&_.ql-container]:flex-1 [&_.ql-container]:text-base [&_.ql-editor]:min-h-[300px]">
                <ReactQuill 
                  theme="snow" 
                  value={content} 
                  onChange={setContent} 
                  modules={QUILL_MODULES}
                  className="h-full flex-1 border-none flex flex-col"
                />
              </div>
            </div>
            
          </CardContent>
        </Card>

        {/* SEO Meta Tags Card */}
        <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4 flex flex-row items-center gap-2">
            <FileText size={18} className="text-gray-500" />
            <CardTitle className="text-lg">Pengaturan SEO (Opsional)</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <p className="text-sm text-gray-500 mb-4">
              Isi data di bawah ini agar artikel Anda lebih mudah ditemukan di mesin pencari seperti Google.
            </p>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Meta Title</label>
              <Input 
                placeholder="Judul khusus untuk SEO (Maks. 60 Karakter)" 
                value={metaTitle} 
                onChange={(e) => setMetaTitle(e.target.value)} 
                maxLength={60}
              />
              <p className="text-xs text-gray-400">Jika dikosongkan, akan otomatis menggunakan Judul Artikel.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Meta Description</label>
              <textarea 
                placeholder="Deskripsi singkat mengenai isi artikel (Maks. 160 Karakter)" 
                value={metaDescription} 
                onChange={(e) => setMetaDescription(e.target.value)} 
                maxLength={160}
                rows={3}
                className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Meta Keywords</label>
              <Input 
                placeholder="Contoh: catering, nasi box, catering murah" 
                value={metaKeyword} 
                onChange={(e) => setMetaKeyword(e.target.value)} 
              />
              <p className="text-xs text-gray-400">Pisahkan dengan koma (,)</p>
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/artikel")} className="rounded-xl px-6">
            Batal
          </Button>
          <Button type="submit" disabled={isSubmitting || isUploading} className="bg-[#005926] hover:bg-[#004a1f] text-white rounded-xl px-8">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : editId ? "Simpan Perubahan" : "Tayangkan Artikel"}
          </Button>
        </div>
      </form>
    </div>
  );
}
