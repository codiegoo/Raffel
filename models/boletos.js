import mongoose from 'mongoose';

const collectionName = "tickets"

const collectionSchema = new mongoose.Schema({
  boletos: [{
    id: {
      type: Number,
      required: true,
      unique: true
    },
    numero: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      unique: true
    },
    disponible: {
      type: Boolean,
      default: true
    }
  }]
});

const Boleto = mongoose.models[collectionName] || mongoose.model(collectionName, collectionSchema);

export default Boleto;
