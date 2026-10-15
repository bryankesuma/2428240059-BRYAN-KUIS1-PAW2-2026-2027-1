import mongoose from 'mongoose';
import { number } from 'zod';

const schema = new mongoose.schema(
    {
        nomor_resi: {
            type: String,
            required: true,
            unique: true
        },
        nama_paket: {
            type: String,
            required: true,
            unique: true
        },
        keterangan_paket: {
            type: String,
            required: true,
            unique: true
        },
        nama_pengirim:{
            type: String,
            required: true,
            unique: true
        },
        nama_penerima: {
            type: String,
            required: true,
            unique: true
        },
        berat_kg: {
            type: Number,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true,
    }
)

const PaketModel = mongoose.model('paket', schema)