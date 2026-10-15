import mongoose from "mongoose";
import PaketModel from "./paket.model.js";
import PenerimaModel from "../models/penerima.model.js";
import { storePaketSchema, updatePaketSchema } from "../schemas/paket.schema.js";
import { apiResponse, apiResponseValidation } from "../helpers/apiResponse.js";

class PenerimaController {
    static async index(req, res) {
        const listPenerima = await PenerimaModel.find().populate("nama_penerima nomor_resi nama_paket keterangan_paket nama_pengirim berat_kg");
        return apiResponse({
            res,
            status: 200,
            message: 'Daftar penerima berhasil dibuat!',
            data: listPenerima
        });    
    }

    static async store(req, res) {
        const result = storePaketSchema.safeParse(req.body)

        if (!result.success) {
            return apiResponseValidation({res, errors: result.error})
        }

        const { kode_penerima } = result.data

        const { nama_penerima } = result.data

        const existingPenerima = await PenerimaModel.findOne({ kode_penerima });

        if (existingPenerima) {
            return apiResponse({
                res,
                status: 400,
                message: 'Kode penerima sudah digunakan!'
            });
        }

        const newPenerima = await PenerimaModel.create({ kode_penerima, nama_penerima });
        
        return apiResponse({
            res,
            status: 201,
            message: 'Penerima berhasil dibuat!',
            data: newPenerima
        });
    }    

    static async create(req, res) {
        const { kode_penerima} = req.body
        // Validasi input
        if (!kode_penerima) {
            return apiResponse({        
                res,
                status: 400,
                message: 'Kode penerima harus diisi!'
            })
        }
        
        const {nama_penerima} = req.body
        // Validasi input
        if (!nama_penerima) {   
            return apiResponse({
                res,
                status: 400,
                message: 'Nama penerima harus diisi!'
            })
        }

        const existingPenerima = await PenerimaModel.findOne({ kode_penerima });

        if (existingPenerima) {
            return apiResponse({
                res,
                status: 400,
                message: 'Kode penerima sudah digunakan!'
            });
        }

        const existingNamaPenerima = await PenerimaModel.findOne({ nama_penerima });

        if (existingNamaPenerima) {
            return apiResponse({
                res,
                status: 400,
                message: 'Nama penerima sudah digunakan!'
            });
        }

        const existingNomorResi = await PenerimaModel.findOne({ nomor_resi });

        if (existingNomorResi) {
            return apiResponse({
                res,
                status: 400,
                message: 'Nomor resi sudah digunakan!'
            });
        }

        const existingNamaPaket = await PenerimaModel.findOne({ nama_paket });

        if (existingNamaPaket) {
            return apiResponse({
                res,
                status: 400,
                message: 'Nama paket sudah digunakan!'
            });
        }

        const existingKeteranganPaket = await PenerimaModel.findOne({ keterangan_paket });

        if (existingKeteranganPaket) {
            return apiResponse({
                res,
                status: 400,
                message: 'Keterangan paket sudah digunakan!'
            });
        }

        const existingNamaPengirim = await PenerimaModel.findOne({ nama_pengirim });

        if (existingNamaPengirim) {
            return apiResponse({
                res,
                status: 400,
                message: 'Nama pengirim sudah digunakan!'
            });
        }   

        const existingBeratKg = await PenerimaModel.findOne({ berat_kg });

        if (existingBeratKg) {
            return apiResponse({
                res,    
                status: 400,
                message: 'Berat paket sudah digunakan!'
            });
        }

        const { nomor_resi } = req.body
        const { nama_paket } = req.body
        const { keterangan_paket } = req.body
        const { nama_pengirim } = req.body
        const { berat_kg } = req.body
            
        const newPenerima = await PenerimaModel.create({ kode_penerima, nama_penerima })
        return apiResponse({
            res,
            status: 201,
            message: 'Penerima berhasil dibuat!',
            data: newPenerima
        })
        
    }   

    static async show(req, res) {
        const penerimaId = req.params.id
        const penerima = await PenerimaModel.findById(penerimaId).populate("nama_penerima nomor_resi nama_paket keterangan_paket nama_pengirim berat_kg")
        if (!penerima) {
            return apiResponse({
                res,
                status: 404,
                message: 'Penerima tidak ditemukan!'
            })
        }

        return apiResponse({
            res,
            status: 200,
            message: 'Data penerima berhasil ditemukan!',
            data: penerima
        })
    }    

    static async update(req, res) {
        const penerimaId = req.params.id
        const result = updatePaketSchema.safeParse(req.body)

        if (!result.success) {
            return apiResponseValidation({
                res,
                errors: result.error
            })
        }

        const { kode_penerima } = result.data

        const { nama_penerima } = result.data

        const { id_paket } = result.data

        const existingPenerima = await PenerimaModel.findOne({ kode_penerima, _id: { $ne: penerimaId } });

        if (existingPenerima) {
            return apiResponse({
                res,
                status: 400,
                message: 'Kode penerima sudah digunakan!'
            });
        }

        const existingNamaPenerima = await PenerimaModel.findOne({ nama_penerima, _id: { $ne: penerimaId } });

        if (existingNamaPenerima) {
            return apiResponse({
                res,
                status: 400,
                message: 'Nama penerima sudah digunakan!'
            });
        }

        const existingNomorResi = await PenerimaModel.findOne({ nomor_resi, _id: { $ne: penerimaId } });
        
        if (existingNomorResi) {
            return apiResponse({
                res,
                status: 400,
                message: 'Nomor resi sudah digunakan!'
            });
        }

        const existingNamaPaket = await PenerimaModel.findOne({ nama_paket, _id: { $ne: penerimaId } });

        if (existingNamaPaket) {
            return apiResponse({
                res,
                status: 400,
                message: 'Nama paket sudah digunakan!'
            });
        }

        const existingKeteranganPaket = await PenerimaModel.findOne({ keterangan_paket, _id: { $ne: penerimaId } });

        if (existingKeteranganPaket) {
            return apiResponse({
                res,
                status: 400,
                message: 'Keterangan paket sudah digunakan!'
            });
        }

        const existingNamaPengirim = await PenerimaModel.findOne({ nama_pengirim, _id: { $ne: penerimaId } });

        if (existingNamaPengirim) {
            return apiResponse({
                res,
                status: 400,
                message: 'Nama pengirim sudah digunakan!'
            });
        }

        const existingBeratKg = await PenerimaModel.findOne({ berat_kg, _id: { $ne: penerimaId } });

        if (existingBeratKg) {  
            return apiResponse({
                res,
                status: 400,
                message: 'Berat paket sudah digunakan!'
            });
        }

        const paketExists = await PaketModel.findById(id_paket)
        
        if (!paketExists) {
            return apiResponse({
                res,
                status: 404,
                message: 'Paket tidak ditemukan!'
            })
        }

        const penerimaExists = await PenerimaModel.findById(penerimaId)

        if (!penerimaExists) {
            return apiResponse({
                res,
                status: 404,
                message: 'Penerima tidak ditemukan!'
            })
        }

        const PenerimaExists = await PenerimaModel.findById(penerimaId)
        
        if (!PenerimaExists) {
            return apiResponse({
                res,
                status: 404,
                message: 'Penerima tidak ditemukan!'
            })
        }

        penerima.kode_penerima = kode_penerima
        penerima.nama_penerima = nama_penerima
        penerima.id_paket = result.data.id_paket

        await penerima.save()


        
        return apiResponse({
            res,
            status: 200,
            message: 'Data penerima berhasil diperbarui!',
            data: penerima
        })
    }

    static async delete(req, res) {
        const penerimaId = req.params.id
        const penerima = await PenerimaModel.findById(penerimaId)
        if (!penerima) {
            return apiResponse({
                res,
                status: 404,
                message: 'Penerima tidak ditemukan!'
            })
        }

        await PenerimaModel.findOneAndDelete(penerimaId)
        return apiResponse({
            res,
            status: 200,
            message: 'Penerima berhasil dihapus!'
        })

        const penerimaExists = await PenerimaModel.findById(penerimaId);
        if (!penerimaExists) {
            return apiResponse({
                res,
                status: 404,
                message: 'Penerima tidak ditemukan!'
            })
        }
    }    

    static async delete(req, res) {
        const penerimaId = req.params.id
        const penerima = await PenerimaModel.findById(penerimaId)
        if (!penerima) {
            return apiResponse({
                res,
                status: 404,
                message: 'Penerima tidak ditemukan!'
            })
        }   
    }
}






