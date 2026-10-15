import PaketModel from "../models/paket.model"
import { StoreProdukSchema } from "../validations/produk.validation"
import { apiResponse } from "../utils/response"

class PaketController{    
    static async index(req,res) {
        const listPaket = await PaketModel.find()
        return apiResponse({ 
            res, 
            status: 200, 
            data: listPaket
        })
    }

    static async show(req,res) {
        const paketId = req.params.id
        const listPaket = await PaketModel.findById(paketId)
        
        if(!listPaket) {
            return apiResponse({ res, status: 404, message: 'Paket tidak ditemukan!'})
        }

        return apiResponse({ res, status: 200, data: listPaket})
    }     

    static async store(req,res) {
        const result = StorePaketSchema.safeParse(req.body)

        if(!result.success) {
            return apiResponseValidation({ 
                res, 
                errors: result.error 
            })
        }

        const { nomor_resi } = result.data

        const { nama_paket } = result.data

        const { keterangan_paket } = result.data

        const { nama_pengirim } = result.data

        const { nama_penerima } = result.data

        const { berat_kg } = result.data

        const newPaket = await PaketModel.create({ nomor_resi, nama_paket, keterangan_paket, nama_pengirim, nama_penerima, berat_kg })
        return apiResponse({ 
            res, 
            status: 201, 
            message: 'Data sudah dikirim', 
            data: newPaket
        })
    }

    static async update(req,res) {
        const paketId = req.params.id
        const result = UpdatePaketSchema.safeParse(req.body)

        if(!result.success) {
            return apiResponseValidation({
                res,
                errors: result.error
            })
        }

        const { nomor_resi } = result.data

        const { nama_paket } = result.data

        const { keterangan_paket } = result.data

        const { nama_pengirim } = result.data

        const { nama_penerima } = result.data

        const { berat_kg } = result.data

        const PaketExists = await PaketModel.findById(paketId)
        if(!PaketExists) {
            return apiResponse({   
                res, 
                status: 404, 
                message: 'Paket tidak ditemukan!'
            })
        }

        const updatePaket = await PaketModel.findOneAndUpdate(paketId, { nomor_resi, nama_paket, keterangan_paket, 
            nama_pengirim, nama_penerima, berat_kg }, { new: true })

        return apiResponse({ 
            res, 
            status: 200, 
            message: 'Data paket berhasil diperbarui', 
            data: updatedPaket 
        })
    }
    
    static async delete(req,res) {
        const paketId = req.params.id
        const paket = await PaketModel.findById(paketId)
        if(!paket) {
            return apiResponse({ 
                res, 
                status: 404, 
                message: 'Paket tidak ditemukan!'
            })
        }   

        await PaketModel.findOneAndDelete(paketId)
        return apiResponse({ 
            res, 
            status: 200, 
            message: 'Paket berhasil dihapus!'
        })
    }   

}

export default PaketController