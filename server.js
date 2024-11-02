const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const VIDEOS_FILE = path.join(__dirname, 'videos.json');

// قراءة الفيديوهات من الملف
async function readVideos() {
  try {
    const data = await fs.readFile(VIDEOS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading videos:', error);
    return [];
  }
}

// كتابة الفيديوهات إلى الملف
async function writeVideos(videos) {
  try {
    await fs.writeFile(VIDEOS_FILE, JSON.stringify(videos, null, 2));
  } catch (error) {
    console.error('Error writing videos:', error);
  }
}

// الحصول على جميع الفيديوهات
app.get('/api/videos', async (req, res) => {
  const videos = await readVideos();
  res.json(videos);
});

// إضافة فيديو جديد
app.post('/api/videos', async (req, res) => {
  const newVideo = req.body;
  const videos = await readVideos();
  videos.push(newVideo);
  await writeVideos(videos);
  res.status(201).json(newVideo);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});