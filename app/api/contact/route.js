import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Create transporter (server-side only)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your gmail
        pass: process.env.EMAIL_PASS, // app password (not raw Gmail password!)
      },
    });

    // Email you (admin)
    await transporter.sendMail({
      from: email,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, "<br>")}
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.CONTACT_EMAIL,
      to: email,
      subject: "Thank you for your message",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for contacting me!</h2>
          <p>I have received your message and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, "<br>")}
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This is an automated confirmation. Please do not reply to this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
