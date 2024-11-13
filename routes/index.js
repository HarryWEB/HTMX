import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import articles from "../data/articles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads/"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.render("index", { title: "Product Listing", articles: articles });
});

router.get("/articles/:id", (req, res) => {
  const article = articles.find((a) => a.id === parseInt(req.params.id));
  if (article) {
    res.render("article", { title: article.name, article });
  } else {
    res.status(404).send("Article not found");
  }
});

router.get('/article/:id/edit', (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.id));
  if (article) {
    res.render('edit', { article });
  } else {
    res.status(404).send('Article not found');
  }
});

router.put('/article/:id/edit', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, body, path } = req.body;
  const articleIndex = articles.findIndex(a => a.id === id);
  
  if (articleIndex !== -1) {
    articles[articleIndex] = { ...articles[articleIndex], name, body, path };
    res.render('article', { article: articles[articleIndex] });
  } else {
    res.status(404).send('Article not found');
  }
});

router.post("/articles", upload.single("image"), (req, res) => {
  const { name, body } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  const article = {
    id: Math.floor(Math.random() * 1000000),
    name,
    body,
    path: imagePath,
  };
  articles.push(article);

  setTimeout(() => {
    res.render("partials/list", { articles: articles });
  }, 1000);
});

export default router;
