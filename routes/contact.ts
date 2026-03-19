import { Router, type IRouter } from "express";

const router: IRouter = Router();

type EventType =
  | "event_scheduled"
  | "date_time_selected"
  | "dialog_opened"
  | "widget_viewed"
  | "opened_external_tab"
  | "unknown";

interface BookingEvent {
  id: string;
  name: string;
  email: string;
  eventType: EventType;
  rawMessage: string;
  receivedAt: string;
}

const eventLog: BookingEvent[] = [];
const MAX_EVENTS = 100;

function parseEventType(message: string): EventType {
  const known: EventType[] = [
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
  const { name, email, message } = req.body as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "message is required" });
    return;
  }

  const eventType = parseEventType(message);

  const event: BookingEvent = {
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

  res.status(200).json({ success: true, eventType });
});

// GET /api/contact — list all received booking events (newest first)
router.get("/contact", (_req, res) => {
  res.json({
    total: eventLog.length,
    events: [...eventLog].reverse(),
  });
});

export default router;
