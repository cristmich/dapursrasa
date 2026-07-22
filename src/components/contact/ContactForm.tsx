"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  nama: z.string().min(2, { message: "Nama minimal 2 karakter." }),
  noHp: z.string().min(10, { message: "Nomor HP tidak valid." }),
  email: z.string().email({ message: "Email tidak valid." }).optional().or(z.literal("")),
  jenisAcara: z.string().min(2, { message: "Jenis acara harus diisi." }),
  jumlahPax: z.string().min(1, { message: "Jumlah porsi harus diisi." }),
  lokasi: z.string().min(5, { message: "Lokasi acara harus diisi detail." }),
  tanggal: z.string().min(1, { message: "Tanggal acara harus diisi." }),
  pesan: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      noHp: "",
      email: "",
      jenisAcara: "",
      jumlahPax: "",
      lokasi: "",
      tanggal: "",
      pesan: "",
    },
  });

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    
    const text = `Halo Admin Dapur Srasa, saya ingin menanyakan catering untuk:
    
Nama: ${values.nama}
No. HP: ${values.noHp}
Acara: ${values.jenisAcara}
Jumlah Pax: ${values.jumlahPax}
Tanggal: ${values.tanggal}
Lokasi: ${values.lokasi}
Pesan Tambahan: ${values.pesan || "-"}

Mohon info lebih lanjut. Terima kasih.`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/62895328596248?text=${encodedText}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.open(whatsappUrl, "_blank");
      reset();
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1000);
  }

  if (isSuccess) {
    return (
      <div className="bg-[#005926]/5 border border-[#005926]/20 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="bg-[#005926] text-white p-4 rounded-full mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="font-heading text-2xl font-bold text-[#333333] mb-2">Pesan Berhasil Dibuat!</h3>
        <p className="text-gray-600 mb-6">
          Anda akan dialihkan ke WhatsApp untuk melanjutkan percakapan dengan admin kami.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full border-[#005926] text-[#005926]">
          Kirim Pesan Lainnya
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nama" className="text-[#333333]">Nama Lengkap *</Label>
          <Input id="nama" placeholder="John Doe" className="rounded-lg bg-[#F8F8F8] border-gray-200 focus-visible:ring-[#005926]" {...register("nama")} />
          {errors.nama && <p className="text-sm text-red-500">{errors.nama.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="noHp" className="text-[#333333]">Nomor WhatsApp *</Label>
          <Input id="noHp" type="tel" placeholder="08123456789" className="rounded-lg bg-[#F8F8F8] border-gray-200 focus-visible:ring-[#005926]" {...register("noHp")} />
          {errors.noHp && <p className="text-sm text-red-500">{errors.noHp.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="jenisAcara" className="text-[#333333]">Jenis Acara *</Label>
          <Input id="jenisAcara" placeholder="Contoh: Wedding, Seminar, dll" className="rounded-lg bg-[#F8F8F8] border-gray-200 focus-visible:ring-[#005926]" {...register("jenisAcara")} />
          {errors.jenisAcara && <p className="text-sm text-red-500">{errors.jenisAcara.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="jumlahPax" className="text-[#333333]">Jumlah Porsi (Pax) *</Label>
          <Input id="jumlahPax" type="number" placeholder="Contoh: 100" className="rounded-lg bg-[#F8F8F8] border-gray-200 focus-visible:ring-[#005926]" {...register("jumlahPax")} />
          {errors.jumlahPax && <p className="text-sm text-red-500">{errors.jumlahPax.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="tanggal" className="text-[#333333]">Tanggal Acara *</Label>
          <Input id="tanggal" type="date" className="rounded-lg bg-[#F8F8F8] border-gray-200 focus-visible:ring-[#005926]" {...register("tanggal")} />
          {errors.tanggal && <p className="text-sm text-red-500">{errors.tanggal.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lokasi" className="text-[#333333]">Lokasi Acara *</Label>
          <Input id="lokasi" placeholder="Detail alamat atau gedung" className="rounded-lg bg-[#F8F8F8] border-gray-200 focus-visible:ring-[#005926]" {...register("lokasi")} />
          {errors.lokasi && <p className="text-sm text-red-500">{errors.lokasi.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pesan" className="text-[#333333]">Catatan Tambahan</Label>
        <Textarea 
          id="pesan"
          placeholder="Request khusus, alergi, atau pesan lainnya..." 
          className="rounded-lg bg-[#F8F8F8] border-gray-200 focus-visible:ring-[#005926] min-h-[120px]" 
          {...register("pesan")} 
        />
        {errors.pesan && <p className="text-sm text-red-500">{errors.pesan.message}</p>}
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-[#005926] hover:bg-[#004a1f] text-white h-14 rounded-full text-base font-semibold shadow-md transition-all hover:shadow-lg"
      >
        {isSubmitting ? "Memproses..." : (
          <span className="flex items-center gap-2">
            Kirim via WhatsApp <Send size={18} />
          </span>
        )}
      </Button>
    </form>
  );
}

