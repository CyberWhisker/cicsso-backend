const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, userId, token) => {
    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // e.g., Gmail, Outlook, etc.
            auth: {
                user: process.env.EMAIL, // Your email address
                pass: process.env.EMAIL_PASSWORD // Your email password or app password
            }
        });

        // Verification link
        const verificationLink = `${process.env.CLIENT_URL}verify-email?token=${token}&userId=${userId}`;

        // Email options
        const mailOptions = {
            from: `"Your App Name" <${process.env.EMAIL}>`,
            to: email,
            subject: 'Verify Your Email Address',
            html: `
                <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
                    <h2>Welcome to CICSO APP!</h2>
                    <p>Thank you for registering. Please verify your email address by clicking the link below:</p>
                    <a href="${verificationLink}" style="color: #007BFF;">Verify Email</a>
                    <p>If you did not register for an account, please ignore this email.</p>
                    <p>Thank you,</p>
                    <p>Your App Team</p>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', email);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Could not send verification email.');
    }
};

module.exports = sendVerificationEmail;
