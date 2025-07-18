import mongoose, { Schema, Model } from 'mongoose';
import { Genre, IBook, IBookModel } from './book.interface';

type IBookDocument = IBook & Document;

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    enum: {
      values: Object.values(Genre),
      message: 'Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY'
    }
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  copies: {
    type: Number,
    required: [true, 'Copies is required'],
    min: [0, 'Copies must be a positive number']
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
});


bookSchema.methods.updateAvailability = function (): void {
  this.available = this.copies > 0;
};



// Static method to find available books
bookSchema.statics.findAvailable = function() {
  return this.find({ available: true });
};

// Pre-save middleware to automatically set availability
bookSchema.pre('save', function(next) {
  if (this.isModified('copies')) {
    this.available = this.copies > 0;
  }
  next();
});

// Post-save middleware for logging
bookSchema.post('save', function(doc) {
  console.log(`Book saved: ${doc.title} (${doc.copies} copies available)`);
});

 const Book: IBookModel = mongoose.model<IBook, IBookModel>('Book', bookSchema);


export default Book;