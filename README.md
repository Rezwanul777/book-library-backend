📚 Library Management System

A RESTful API for managing a library's book inventory and borrow records. Built with **Node.js**, **Express**, **TypeScript**, and **MongoDB** (via **Mongoose**).

Project run: clone from github then npm install and run in termila *** npm run dev

## 🚀 Features

- 📖 **Book Management** (CRUD operations)
- 🔍 **Genre Filtering & Sorting**
- 📊 **Borrow Summary using Aggregation Pipeline**
- 🔄 **Availability Control with Business Logic**
- ✅ Schema Validation (Mongoose)
- 🧠 Mongoose Middleware (`pre`, `post`)
- 🛠️ Static & Instance Methods
- 🧼 Centralized Error Handling

---


## 📚 API Endpoints

### 1. 📘 Create Book  
`POST /api/books`

Creates a new book with validation rules for genre, ISBN, and copy count.

### 2. 📗 Get All Books  
`GET /api/books`

Supports query filtering and sorting:
*** ?filter=GENRE&sortBy=createdAt&sort=asc|desc&limit=5

### 3. 📙 Get Book by ID  
`GET /api/books/:bookId`

Returns a single book by its ObjectId.

### 4. 📝 Update Book  
`PUT /api/books/:bookId`

Allows updating any field. Copies automatically update availability.

### 5. 🗑️ Delete Book  
`DELETE /api/books/:bookId`

Removes the book from the library.

---

### 6. 📤 Borrow a Book  
`POST /api/borrow`

**Business Logic:**
- Checks availability and copies
- Deducts quantity
- Marks book as unavailable if copies become zero
- Saves borrow record with due date

### 7. 📊 Borrowed Summary  
`GET /api/borrow`

Returns **total quantity borrowed per book** with book title and ISBN.

Uses a MongoDB **aggregation pipeline**.




### Project setup
1. At first git clone then in terminal npm i
2.npm run dev