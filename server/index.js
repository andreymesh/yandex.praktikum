import express from 'express';
import path from 'path';
const app = express();

const PORT = 3000;

app.use(express.static(path.resolve(process.cwd(), 'dist')));

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT}`);
});
