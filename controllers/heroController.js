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
  const { title, subtitle, description } = req.body;
  try {
    const hero = await Hero.findOneAndUpdate({}, { title, subtitle, description }, { new: true, upsert: true });
    res.json({ success: true, hero });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
