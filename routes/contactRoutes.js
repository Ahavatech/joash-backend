import express from "express";
import crypto from "crypto";
import transporter from "../config/mailer.js";

const router = express.Router();

const eventLog = [];
const MAX_EVENTS = 100;

function parseEventType(message) {
  const known = [
    "event_scheduled",
    "date_time_selected",
    "dialog_opened",
    "widget_viewed",
    "opened_external_tab",
  ];
  for (const type of known) {
    if (message.includes(type)) return type;
  }
  return "unknown";
}

// POST /api/contact — receives booking events from the Calendly widget on the frontend
router.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "message is required" });
    return;
  }

  const eventType = parseEventType(message);

  const event = {
    id: crypto.randomUUID(),
    name: name ?? "Unknown",
    email: email ?? "",
    eventType,
    rawMessage: message,
    receivedAt: new Date().toISOString(),
  };

  if (eventLog.length >= MAX_EVENTS) eventLog.shift();
  eventLog.push(event);

  const label =
    eventType === "event_scheduled"
      ? "BOOKING CONFIRMED"
      : eventType.toUpperCase();

  console.log(`[${event.receivedAt}] ${label} | ${event.name} <${event.email}>`);

  // Send confirmation emails if booking is confirmed
  if (eventType === "event_scheduled" && email) {
    sendBookingEmails(event).catch((err) =>
      console.error("Email sending failed:", err.message)
    );
  }

  res.status(200).json({ success: true, eventType });
});

// GET /api/contact — list all received booking events (newest first)
router.get("/contact", (_req, res) => {
  res.json({
    total: eventLog.length,
    events: [...eventLog].reverse(),
  });
});

// Send booking confirmation emails
async function sendBookingEmails(event) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;

  // Email to admin
  await transporter.sendMail({
    to: adminEmail,
    subject: "New Booking Confirmed",
    html: `
      <h2>Booking Confirmed</h2>
      <p><strong>Name:</strong> ${event.name}</p>
      <p><strong>Email:</strong> ${event.email}</p>
      <p><strong>Event:</strong> ${event.eventType}</p>
      <p><strong>Received:</strong> ${event.receivedAt}</p>
      <p><strong>Details:</strong> ${event.rawMessage}</p>
    `,
  });

  // Email to client
  await transporter.sendMail({
    to: event.email,
    subject: "Call Booking Confirmation",
    html: `
      <h2>Your Call is Booked!</h2>
      <p>Hi ${event.name},</p>
      <p>Thank you for booking a call with us. Your appointment has been confirmed and added to your calendar.</p>
      <p>We look forward to speaking with you soon!</p>
      <br />
      <p>Best regards,<br />Joash Team</p>
    `,
  });
}

export default router;
