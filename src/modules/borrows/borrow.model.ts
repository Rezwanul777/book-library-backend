import mongoose, { Schema } from 'mongoose';
import { IBorrow } from './borrow.interface';

const borrowSchema = new Schema<IBorrow>({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
  },
  dueDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});


// if (mongoose.models.Borrow) {
//   delete mongoose.models.Borrow;
// }

const Borrow = mongoose.model<IBorrow>('Borrow', borrowSchema);
export default Borrow;

