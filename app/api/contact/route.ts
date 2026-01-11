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
<div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; max-width: 600px; line-height: 1.6; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px;">
    <p>Dear ${name.split(' ')[0]},</p>
    
    <p>Thank you for reaching out. I have received your message and will review it shortly. Here is a brief introduction to my work while you wait:</p>
    
    <hr style="border: 0; border-top: 1px solid #f0f0f0; margin: 20px 0;">

    <h3 style="color: #2563ea; margin-bottom: 10px;">About Me</h3>
    <p style="margin-top: 0;">I am a Full-Stack Developer and Founder specializing in building scalable, high-performance web applications. I turn complex problems into seamless, user-centric digital experiences through code and design.</p>
    
    <h3 style="color: #2563ea; margin-bottom: 10px;">My Technical Arsenal</h3>
    <ul style="list-style-type: none; padding: 0;">
        <li style="margin-bottom: 8px;"><strong>Core Stack:</strong> Next.js 15, React, TypeScript, Node.js</li>
        <li style="margin-bottom: 8px;"><strong>Styling & UI:</strong> Tailwind CSS, Framer Motion, GSAP, HTML Canvas</li>
        <li style="margin-bottom: 8px;"><strong>Backend & Cloud:</strong> PostgreSQL, Prisma, AWS, Google Cloud, Docker</li>
        <li style="margin-bottom: 8px;"><strong>Tools:</strong> Git, Figma, Vercel/Netlify CI/CD</li>
    </ul>

    <h3 style="color: #2563ea; margin-bottom: 10px;">What I Can Offer You</h3>
    <ul style="padding-left: 20px;">
        <li style="margin-bottom: 5px;"><strong>End-to-End Development:</strong> From concept to deployment, I handle the full lifecycle.</li>
        <li style="margin-bottom: 5px;"><strong>Performance Optimization:</strong> Lightning-fast load times and SEO-ready architecture.</li>
        <li style="margin-bottom: 5px;"><strong>Interactive Experiences:</strong> Premium, Awwwards-level animations and user interfaces.</li>
        <li style="margin-bottom: 5px;"><strong>Scalable Infrastructure:</strong> Robust backend systems built for growth.</li>
    </ul>

    <hr style="border: 0; border-top: 1px solid #f0f0f0; margin: 20px 0;">
    
    <p>I look forward to potentially collaborating with you.</p>
    
    <p>Best regards,</p>
    
    <p style="margin-bottom: 0;"><strong>Shivansh Singh</strong></p>
    <p style="color: #666; font-size: 0.9em; margin-top: 5px;">Founder @ ChargeBrize | Co-Founder @ RoadSathi<br>
    <a href="https://shivansh-portfolio-nine.vercel.app/" style="color: #2563ea; text-decoration: none;">View Portfolio</a></p>
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
