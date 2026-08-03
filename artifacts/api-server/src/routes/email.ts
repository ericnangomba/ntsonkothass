import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// Email configuration
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const FROM_EMAIL = process.env.FROM_EMAIL || "ntsonkothaschool@gmail.com";
const TO_EMAIL = "principal.2000600642@ecschools.org.za";
const BCC_EMAIL = "ericnangomba@hotmail.com";

// Create transporter
const createTransporter = (): nodemailer.Transporter | null => {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return null;
  }
  
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });
};

router.post("/send", async (req, res) => {
  try {
    const { fullName, phone, email, subject, message } = req.body;

    // Validate required fields
    if (!fullName || !phone || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const transporter = createTransporter();
    
    if (!transporter) {
      logger.error("Gmail credentials not configured");
      return res.status(500).json({ error: "Email service not configured" });
    }

    // Prepare email content
    const emailSubject = `[${subject}] Enquiry from ${fullName}`;
    const emailHtml = `
      <h2>New Enquiry from Website</h2>
      <p><strong>From:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `;
    const emailText = `
      New Enquiry from Website
      
      From: ${fullName}
      Email: ${email}
      Phone: ${phone}
      Subject: ${subject}
      
      Message:
      ${message}
    `;

    // Send email
    const info = await transporter.sendMail({
      from: `"Ntsonkotha Senior Secondary School" <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      bcc: BCC_EMAIL,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    logger.info({ messageId: info.messageId, to: TO_EMAIL, bcc: BCC_EMAIL }, "Email sent successfully");
    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    logger.error({ error }, "Error sending email");
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
