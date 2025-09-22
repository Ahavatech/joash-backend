import Contact from "../models/Contact.js";
import transporter from "../config/mailer.js";

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.json({ success: true, contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addContact = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contact = await Contact.create({ name, email, message });
    // Send email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });
    res.json({ success: true, message: "Message sent and saved" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
