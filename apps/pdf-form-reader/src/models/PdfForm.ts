import { Schema, model, models } from 'mongoose';

const PdfFormSchema = new Schema({
  formData: { type: Map, of: String },
  createdAt: { type: Date, default: Date.now },
});

export default models.PdfForm || model('PdfForm', PdfFormSchema);
