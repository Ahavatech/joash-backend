import Hero from "../models/Hero.js";

export const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json({ success: true, hero });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateHero = async (req, res) => {
  const { headline, subheadline, ctaText, ctaLink } = req.body;
  try {
    const hero = await Hero.findOneAndUpdate({}, { headline, subheadline, ctaText, ctaLink }, { new: true, upsert: true });
    res.json({ success: true, hero });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const uploadHeroImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No image uploaded" });
    const hero = await Hero.findOneAndUpdate({}, {
      backgroundImage: {
        url: req.file.path,
        public_id: req.file.filename || req.file.public_id,
      },
    }, { new: true, upsert: true });
    res.json({ success: true, hero });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteHeroImage = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero || !hero.backgroundImage?.public_id) {
      return res.status(404).json({ success: false, message: "No image to delete" });
    }
    // Optionally: delete from Cloudinary here
    hero.backgroundImage = undefined;
    await hero.save();
    res.json({ success: true, message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
