````markdown
# Workshop 04 – Requirements

## Overview
This document describes the **tasks and requirements** for Workshop 04 - Building a Full-Stack App with MongoDB.

Complete all **mandatory tasks** (Tasks 1-5).  
Optional tasks (Task 6+) are provided for additional practice and learning.

---

## General Rules
- Work only inside the `starter/` folder
- Create a `.env` file for your MongoDB connection string
- Do not commit `node_modules`, `.env`, or sensitive data
- Commit your work regularly with meaningful commit messages
- Use descriptive variable and function names
- Follow async/await patterns for database operations

---

## Environment Setup

### Create a `.env` File
Before starting tasks, create a `.env` file in the `starter/` folder:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/workshop04
PORT=3000
NODE_ENV=development
```

Install the `dotenv` package:
```bash
npm install dotenv
```

Load it in your `server.js`:
```javascript
require('dotenv').config();
```

---

## Mandatory Tasks

### Task 1 – Install and Connect to MongoDB

**Description**  
Set up MongoDB connection in your Express application using Mongoose.

**Requirements**
- Install necessary npm packages:
  - `express`
  - `mongoose`
  - `dotenv`
  - `nodemon` (dev dependency)
  
- Import required modules in `server.js`:
  ```javascript
  const express = require('express');
  const mongoose = require('mongoose');
  require('dotenv').config();
  ```

- Connect to MongoDB using Mongoose:
  ```javascript
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
  mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:', err);
  });
  ```

- Define `PORT` constant and start the Express server

**Expected Outcome**
When you run the application, you should see:
- "Connected to MongoDB" message
- Server running on `http://localhost:3000`

---

### Task 2 – Create a Mongoose Schema and Model

**Description**  
Define a Mongoose schema and model for your data (e.g., a "Post" or "User" model).

**Requirements**
- Create a `models/` directory in `starter/`
- Create a model file (e.g., `models/Post.js` or `models/User.js`)
- Define a Mongoose schema with at least these fields:
  - `title` (String, required)
  - `description` (String, required)
  - `createdAt` (Date, defaults to current date)
  - One additional field of your choice

- Define timestamps automatically:
  ```javascript
  const schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });
  ```

- Export the model:
  ```javascript
  module.exports = mongoose.model('Post', schema);
  ```

**Expected Code Structure**
```javascript
// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
```

---

### Task 3 – Implement Create Operation (POST)

**Description**  
Create an API endpoint that accepts POST requests and saves documents to MongoDB.

**Requirements**
- Create a `routes/` directory (or add routes directly to `server.js`)
- Set up middleware to parse JSON:
  ```javascript
  app.use(express.json());
  ```

- Create a POST endpoint `/api/posts` (or your chosen resource):
  ```javascript
  app.post('/api/posts', async (req, res) => {
    // Extract data from request body
    // Create a new document
    // Save to MongoDB
    // Return the saved document or appropriate response
  });
  ```

- Include error handling:
  ```javascript
  catch (err) {
    res.status(500).json({ error: err.message });
  }
  ```

- Test with curl or Postman:
  ```bash
  curl -X POST http://localhost:3000/api/posts \
    -H "Content-Type: application/json" \
    -d '{"title":"My Post","description":"This is my post"}'
  ```

**Expected Outcome**
- Successfully insert documents into MongoDB
- Return JSON response with the created document
- Handle validation errors gracefully

---

### Task 4 – Implement Read Operations (GET)

**Description**  
Create API endpoints to retrieve documents from the database.

**Requirements**
- Create a GET endpoint `/api/posts` to retrieve all documents:
  ```javascript
  app.get('/api/posts', async (req, res) => {
    // Query all documents from the database
    // Return as JSON array
  });
  ```

- Create a GET endpoint `/api/posts/:id` to retrieve a single document:
  ```javascript
  app.get('/api/posts/:id', async (req, res) => {
    // Query document by ID
    // Return the document or 404 error
  });
  ```

- Include error handling for invalid IDs:
  ```javascript
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  ```

- Test your endpoints:
  ```bash
  curl http://localhost:3000/api/posts
  curl http://localhost:3000/api/posts/<document-id>
  ```

**Expected Outcome**
- Retrieve all documents from the collection
- Retrieve a specific document by ID
- Return proper HTTP status codes (200, 404, etc.)

---

### Task 5 – Implement Update and Delete Operations

**Description**  
Create endpoints to update and delete documents in the database.

**Requirements**
- Create a PUT/PATCH endpoint `/api/posts/:id` for updates:
  ```javascript
  app.put('/api/posts/:id', async (req, res) => {
    // Find the document
    // Update with new data
    // Return updated document
  });
  ```

- Create a DELETE endpoint `/api/posts/:id`:
  ```javascript
  app.delete('/api/posts/:id', async (req, res) => {
    // Find and delete the document
    // Return success message
  });
  ```

- Use Mongoose methods:
  ```javascript
  const post = await Post.findByIdAndUpdate(id, updateData, { new: true });
  const result = await Post.findByIdAndDelete(id);
  ```

- Include proper status codes and error handling

- Test your endpoints:
  ```bash
  curl -X PUT http://localhost:3000/api/posts/<id> \
    -H "Content-Type: application/json" \
    -d '{"title":"Updated Title"}'
    
  curl -X DELETE http://localhost:3000/api/posts/<id>
  ```

**Expected Outcome**
- Successfully update documents in the database
- Successfully delete documents
- Return appropriate responses and status codes

---

## Optional Tasks

### Task 6 – Create an HTML Form for Data Entry

**Description**  
Add an HTML form to submit data without using API tools.

**Requirements**
- Create or modify `public/add-post.html` with a form
- Form should have fields matching your schema
- Use JavaScript to handle form submission via fetch:
  ```javascript
  document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      alert('Post created successfully!');
    }
  });
  ```

**Expected Outcome**
- Form successfully submits data to MongoDB
- Success/error messages displayed to user
- Page resets after successful submission

---

### Task 7 – Add Data Validation

**Description**  
Enhance Mongoose schema with custom validation rules.

**Requirements**
- Add validation to schema fields:
  ```javascript
  const schema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      minlength: 20
    }
  });
  ```

- Add custom validators:
  ```javascript
  validate: {
    validator: function(value) {
      return value.length > 10;
    },
    message: 'Field must be longer than 10 characters'
  }
  ```

- Return validation errors to client:
  ```javascript
  catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        error: Object.values(err.errors).map(e => e.message) 
      });
    }
  }
  ```

---

### Task 8 – Add Indexes for Performance

**Description**  
Create database indexes to optimize query performance.

**Requirements**
- Add indexes to frequently searched fields:
  ```javascript
  postSchema.index({ title: 1 });
  postSchema.index({ createdAt: -1 });
  ```

- Or use schema options:
  ```javascript
  const schema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    email: { type: String, required: true, unique: true }
  });
  ```

- Verify indexes in MongoDB Atlas or local MongoDB

---

### Task 9 – Create Relationships Between Models

**Description**  
Introduce multiple models with references/relationships.

**Requirements**
- Create an additional model (e.g., Comments, Authors)
- Reference the first model:
  ```javascript
  const commentSchema = new mongoose.Schema({
    text: String,
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
  });
  ```

- Use `populate()` to retrieve related data:
  ```javascript
  const post = await Post.findById(id).populate('comments');
  ```

---

### Task 10 – Add Pagination

**Description**  
Implement pagination for list endpoints.

**Requirements**
- Modify the GET all documents endpoint:
  ```javascript
  app.get('/api/posts', async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    
    const posts = await Post.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
      
    const total = await Post.countDocuments();
    
    res.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  });
  ```

- Test pagination:
  ```bash
  curl http://localhost:3000/api/posts?page=1&limit=5
  ```

---

## Testing Your API

### Using cURL
```bash
# Create
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test description"}'

# Read all
curl http://localhost:3000/api/posts

# Read one
curl http://localhost:3000/api/posts/<id>

# Update
curl -X PUT http://localhost:3000/api/posts/<id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated"}'

# Delete
curl -X DELETE http://localhost:3000/api/posts/<id>
```

### Using Postman
1. Install [Postman](https://www.postman.com/downloads/)
2. Create requests for each endpoint
3. Save as a collection for easy testing

---

## Submission Requirements

- All mandatory tasks (1-5) must be completed
- Code should be well-commented
- `.env` file should not be committed (add to `.gitignore`)
- Include at least 2 commits with meaningful messages
- All endpoints should be tested and working
- Error handling should be implemented

---

## Grading Criteria

| Criteria | Points |
|----------|--------|
| Task 1 - Connection | 10 |
| Task 2 - Schema/Model | 15 |
| Task 3 - Create (POST) | 15 |
| Task 4 - Read (GET) | 15 |
| Task 5 - Update/Delete | 15 |
| Code Quality | 15 |
| Error Handling | 10 |
| **Total** | **95** |

Optional tasks: +5 points each (up to 100)

---

## Resources

### MongoDB
- [MongoDB Developer Hub](https://developer.mongodb.com/)
- [Building with MongoDB](https://docs.mongodb.com/docs/)

### Mongoose
- [Mongoose Getting Started](https://mongoosejs.com/docs/index.html)
- [Mongoose Queries](https://mongoosejs.com/docs/queries.html)
- [Mongoose Validation](https://mongoosejs.com/docs/validation.html)

### Learning References
- [RESTful API Design](https://restfulapi.net/)
- [Express.js Complete Guide](https://expressjs.com/)
- [Async/Await Tutorial](https://javascript.info/async-await)

---

**Good luck with your MongoDB workshop! 🎉**
````
