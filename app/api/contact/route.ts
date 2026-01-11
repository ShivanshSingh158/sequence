import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, email, message, phone } = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 1. Email to Admin (You)
        const mailOptionsAdmin = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            replyTo: email,
            subject: `New Portfolio Inquiry from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
            `,
            html: `
<div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #222;">New Portfolio Inquiry</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
</div>
            `,
        };

        // 2. Auto-Reply to Visitor
        const mailOptionsUser = {
            from: `"Shivansh Singh" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Thank you for connecting - Shivansh Singh`,
            html: `
<div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; max-width: 600px; line-height: 1.6;">
    <p>Dear ${name.split(' ')[0]},</p>
    
    <p>Thank you for reaching out. I have received your message and appreciate your interest.</p>
    
    <p><strong>A bit about me:</strong><br>
    I am the Founder of <strong>ChargeBrize</strong> and Co-Founder of <strong>RoadSathi</strong>. My work focuses on building scalable, low-asset infrastructure and creating seamless digital experiences that solve real-world problems.</p>
    
    <p>I will review your inquiry regarding <em>"${message.substring(0, 30)}${message.length > 30 ? '...' : ''}"</em> and get back to you as soon as possible.</p>
    
    <p>Best regards,</p>
    
    <p><strong>Shivansh Singh</strong><br>
    <span style="color: #666; font-size: 0.9em;">Founder @ ChargeBrize | Web Developer</span></p>
</div>
            `,
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(mailOptionsAdmin),
            transporter.sendMail(mailOptionsUser)
        ]);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
