import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import articles from '../data/articles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.render('index', {title: 'Product Listing', articles: articles});
});

router.get('/articles/:id', (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.id));
  res.render('article', { title: article.name, article });
});

router.post('/articles', upload.single('image'), (req, res) => {
  const { name, body } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  const article = {
    id: Math.floor(Math.random() * 1000000),
    name,
    body,
    path: imagePath
  };
  articles.push(article);
  
  setTimeout(() => {
    res.render('partials/list', { articles: articles });
  }, 1000);
});

export default router;
