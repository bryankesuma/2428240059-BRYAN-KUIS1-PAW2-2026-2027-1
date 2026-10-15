import z from "zod";

export const storePenerimaSchema = z.object({ 
    kode_penerima: z.string().min(1, { message: "Kode penerima tidak boleh kosong" }),
    nama_penerima: z.string().min(1, { message: "Nama penerima tidak boleh kosong" }),
    nomor_resi: z.string().min(1, { message: "Nomor resi tidak boleh kosong" }),
    nama_paket: z.string().min(1, { message: "Nama paket tidak boleh kosong" }),
    keterangan_paket: z.string().min(1, { message: "Keterangan paket tidak boleh kosong" }),
    nama_pengirim: z.string().min(1, { message: "Nama pengirim tidak boleh kosong" }),
    berat_kg: z.number().min(1, { message: "Berat paket tidak boleh kosong" }),
})