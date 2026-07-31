import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// Email configuration
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@ntsonkotha.org.za";
const TO_EMAIL = "principal.2000600642@ecschools.org.za";
const BCC_EMAIL = "ericnangomba@hotmail.com";

router.post("/send", async (req, res) => {
  try {
    const { fullName, phone, email, subject, message } = req.body;

    // Validate required fields
    if (!fullName || !phone || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!CLOUDFLARE_API_TOKEN || !CLOUDFLARE_ACCOUNT_ID) {
      logger.error("Cloudflare API credentials not configured");
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

    // Call Cloudflare Email Sending REST API
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/email/sending/send`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ address: TO_EMAIL }],
              bcc: [{ address: BCC_EMAIL }],
            },
          ],
          from: {
            address: FROM_EMAIL,
            name: "Ntsonkotha Senior Secondary School",
          },
          subject: emailSubject,
          content: [
            {
              type: "text/html",
              value: emailHtml,
            },
            {
              type: "text/plain",
              value: emailText,
            },
          ],
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      logger.error({ result }, "Failed to send email");
      return res.status(500).json({ error: "Failed to send email" });
    }

    logger.info({ to: TO_EMAIL, bcc: BCC_EMAIL }, "Email sent successfully");
    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    logger.error({ error }, "Error sending email");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
