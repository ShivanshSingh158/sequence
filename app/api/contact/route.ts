import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: `New Portfolio Inquiry from ${name}`,
            text: `
Name: ${name}
Email: ${email}

Message:
${message}
            `,
            html: `
<h3>New Portfolio Inquiry</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<br/>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
