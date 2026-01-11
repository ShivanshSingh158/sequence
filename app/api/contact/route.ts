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
<div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; max-width: 600px; line-height: 1.6; padding: 20px; border: 1px solid #e5e5e5; border-radius: 12px;">
    <p style="font-size: 18px; color: #333;">Dear ${name.split(' ')[0]},</p>
    
    <p>Thank you for reaching out. I have received your message and will review it shortly.</p>
    
    <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
        <h3 style="margin-top: 0; color: #1e293b;">About Me</h3>
        <p style="margin-bottom: 0; color: #475569;">
            I am the Founder of <strong>ChargeBrize</strong> and Co-Founder of <strong>RoadSathi</strong>, dedicated to building scalable infrastructure and seamless digital experiences.<br>
            My work bridges the gap between complex engineering and intuitive design to solve real-world problems.
        </p>
    </div>

    <div style="margin: 25px 0;">
        <h3 style="color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">My Technical Arsenal</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
                <td style="padding: 8px 0; vertical-align: top; width: 50%;">
                    <strong>✨ Core Stack</strong><br>
                    <span style="color: #64748b; font-size: 14px;">Next.js 15, React, TypeScript</span>
                </td>
                <td style="padding: 8px 0; vertical-align: top; width: 50%;">
                    <strong>🎨 Creative & Visual</strong><br>
                    <span style="color: #64748b; font-size: 14px;">Framer Motion, GSAP, Tailwind CSS</span>
                </td>
            </tr>
            <tr>
                <td style="padding: 8px 0; vertical-align: top; width: 50%;">
                    <strong>🚀 Backend & Cloud</strong><br>
                    <span style="color: #64748b; font-size: 14px;">Node.js, PostgreSQL, Serverless</span>
                </td>
                <td style="padding: 8px 0; vertical-align: top; width: 50%;">
                    <strong>🛠 Tools & DevOps</strong><br>
                    <span style="color: #64748b; font-size: 14px;">Git, Docker, Vercel/Netlify</span>
                </td>
            </tr>
        </table>
    </div>

    <div style="background-color: #1e293b; color: white; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <h3 style="margin-top: 0; color: #fff;">What I Can Offer You</h3>
        <ul style="padding-left: 20px; margin-bottom: 0;">
            <li style="margin-bottom: 8px;"><strong>High-Performance Web Applications:</strong> Blazing fast, SEO-optimized, and scalable solutions.</li>
            <li style="margin-bottom: 8px;"><strong>Immersive Interactive Experiences:</strong> award-winning animations and 3D visuals using WebGL/Canvas.</li>
            <li><strong>Full-Cycle Development:</strong> From concept to deployment, handling both frontend polish and backend logic.</li>
        </ul>
    </div>
    
    <p>I look forward to the possibility of collaborating with you.</p>

    <div style="margin-top: 30px; border-top: 1px solid #e5e5e5; padding-top: 20px;">
        <p style="font-weight: bold; margin-bottom: 5px; color: #0f172a;">Shivansh Singh</p>
        <p style="margin: 0; color: #64748b; font-size: 14px;">Founder @ ChargeBrize | Frontend Architect</p>
        <p style="margin: 5px 0 0 0; font-size: 14px;">
            <a href="https://your-portfolio-link.com" style="color: #3b82f6; text-decoration: none;">Portfolio</a> | 
            <a href="https://linkedin.com/in/shivansh-singh-48026232a" style="color: #3b82f6; text-decoration: none;">LinkedIn</a>
        </p>
    </div>
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
