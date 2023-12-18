const router = require("express").Router();
const CourseVideo = require("../models/CourseVideo");

// CREATE CourseVideo
router.post("/", async (req, res) => {
  const newCourseVideo = new CourseVideo(req.body);
  try {
    const savedCourseVideo = await newCourseVideo.save();
    res.status(200).json(savedCourseVideo);
  } catch (err) {
    console.error('Error creating CourseVideo:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// UPDATE CourseVideo
router.put("/:id", async (req, res) => {
  try {
    const CourseVideo = await CourseVideo.findById(req.params.id);
    if (CourseVideo.username === req.body.username) {
      try {
        const updatedCourseVideo = await CourseVideo.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedCourseVideo);
      } catch (err) {
        console.error('Error updating CourseVideo:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(401).json("You can update only your CourseVideo!");
    }
  } catch (err) {
    console.error('Error finding CourseVideo for update:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE CourseVideo
router.delete("/:id", async (req, res) => {
  try {
    const CourseVideo = await CourseVideo.findById(req.params.id);
    if (CourseVideo.username === req.body.username) {
      try {
        await CourseVideo.delete();
        res.status(200).json("CourseVideo has been deleted...");
      } catch (err) {
        console.error('Error deleting CourseVideo:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(401).json("You can delete only your CourseVideo!");
    }
  } catch (err) {
    console.error('Error finding CourseVideo for delete:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET CourseVideo
router.get("/:id", async (req, res) => {
  try {
    const CourseVideo = await CourseVideo.findById(req.params.id);
    if (!CourseVideo) {
      res.status(404).json("CourseVideo not found");
    } else {
      res.status(200).json(CourseVideo);
    }
  } catch (err) {
    console.error('Error finding CourseVideo:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET ALL CourseVideoS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let CourseVideos;
    if (username) {
      CourseVideos = await CourseVideo.find({ username });
    } else if (catName) {
      CourseVideos = await CourseVideo.find({ categories: { $in: [catName] } });
    } else {
      CourseVideos = await CourseVideo.find();
    }
    res.status(200).json(CourseVideos);
  } catch (err) {
    console.error('Error fetching CourseVideos:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
