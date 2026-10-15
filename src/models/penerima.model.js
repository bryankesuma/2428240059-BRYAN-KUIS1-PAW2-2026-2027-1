import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    nomor_penerima: {
      type: String,
      required: true,
      unique: true,
    },    
    nama_penerima: {
      type: result.data.nama_penerima,
      ref: "Paket",
      required: true,
    },
    nomor_resi: {
      type: result.data.nomor_resi,
      ref: "Paket", 
      required: true,
    },
    nama_paket: {
      type: result.data.nama_paket,
      ref: "Paket",
      required: true,
    },
    keterangan_paket: {
        type: result.data.keterangan_paket,
        ref: "Paket",
        required: true,
    },
    nama_pengirim: {
        type: result.data.nama_pengirim,
        ref: "Paket",
        required: true,
    },
    berat_kg: {
        type: result.data.berat_kg,
        ref: "Paket",
        required: true,
    },
    id_paket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paket",
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

const PenerimaModel = mongoose.model("Penerima", schema);
export default PenerimaModel;