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
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Please provide name, email and message" });
  }

  try {
    // Send email first so we only save successful submissions (but we'll still attempt to save on email failure)
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    const contact = await Contact.create({ name, email, message });
    res.json({ success: true, message: "Message sent and saved" });
  } catch (err) {
    // If sending email failed, try to still save the contact so you don't lose messages
    try {
      await Contact.create({ name, email, message });
      console.error("Email send failed, but message saved:", err);
      return res.status(202).json({ success: true, message: "Message saved but email failed to send", error: err.message });
    } catch (saveErr) {
      console.error("Email send failed:", err);
      console.error("Also failed to save contact:", saveErr);
      return res.status(500).json({ success: false, message: "Failed to send message and save contact" });
    }
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
