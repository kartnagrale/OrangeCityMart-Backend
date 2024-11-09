const sgMail = require('@sendgrid/mail');
const path = require('path');

// Initialize SendGrid with API key
if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY is required in environment variables');
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Validate environment variables
const requiredEnvVars = ['SENDER_EMAIL', 'FRONTEND_URL'];
requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        throw new Error(`${varName} is required in environment variables`);
    }
});

/**
 * Base email sender function with error handling and logging
 * @param {Object} emailOptions - The email options
 * @param {string} emailOptions.to - Recipient email
 * @param {string} emailOptions.subject - Email subject
 * @param {string} emailOptions.text - Plain text content
 * @param {string} emailOptions.html - HTML content
 * @returns {Promise<void>}
 */
const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const msg = {
            to,
            from: {
                email: process.env.SENDER_EMAIL,
                name: 'Orange City Mart' // Add your application name here
            },
            subject,
            text,
            html,
            // Optional: Add tracking settings
            trackingSettings: {
                clickTracking: { enable: true },
                openTracking: { enable: true }
            }
        };

        await sgMail.send(msg);
        console.log(`Email sent successfully to ${to}`);
    } catch (error) {
        console.error('Email sending failed:', error);
        // If you have error monitoring like Sentry, log it here
        if (error.response) {
            console.error(error.response.body);
        }
        throw new Error('Failed to send email');
    }
};

/**
 * Generate password reset email content
 * @param {string} token - Reset token
 * @returns {Object} Email content object
 */
const generatePasswordResetContent = (token) => {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    return {
        subject: 'Password Reset Request - Orange City Mart',
        text: `
            You requested a password reset for your Orange City Mart account.
            Please click the following link to reset your password: ${resetLink}
            This link will expire in 1 hour.
            If you didn't request this, please ignore this email.
        `,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Password Reset Request</h2>
                <p>You requested a password reset for your Orange City Mart account.</p>
                <div style="margin: 20px 0;">
                    <a href="${resetLink}" 
                       style="background-color: #4CAF50; color: white; padding: 10px 20px; 
                              text-decoration: none; border-radius: 5px;">
                        Reset Password
                    </a>
                </div>
                <p style="color: #666; font-size: 14px;">
                    This link will expire in 1 hour.<br>
                    If you didn't request this, please ignore this email.
                </p>
            </div>
        `
    };
};

/**
 * Generate email verification content
 * @param {string} token - Verification token
 * @returns {Object} Email content object
 */
const generateVerificationContent = (token) => {
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    
    return {
        subject: 'Verify Your Email - Orange City Mart',
        text: `
            Thank you for registering with Orange City Mart!
            Please verify your email by clicking the following link: ${verificationLink}
            This link will expire in 24 hours.
        `,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Welcome to Orange City Mart!</h2>
                <p>Thank you for registering. Please verify your email to access all features.</p>
                <div style="margin: 20px 0;">
                    <a href="${verificationLink}" 
                       style="background-color: #4CAF50; color: white; padding: 10px 20px; 
                              text-decoration: none; border-radius: 5px;">
                        Verify Email
                    </a>
                </div>
                <p style="color: #666; font-size: 14px;">
                    This link will expire in 24 hours.
                </p>
            </div>
        `
    };
};

/**
 * Send password reset email
 * @param {string} to - Recipient email address
 * @param {string} resetToken - Password reset token
 * @returns {Promise<void>}
 */
const sendPasswordResetEmail = async (to, resetToken) => {
    const content = generatePasswordResetContent(resetToken);
    await sendEmail({
        to,
        ...content
    });
};

/**
 * Send email verification email
 * @param {string} to - Recipient email address
 * @param {string} verificationToken - Email verification token
 * @returns {Promise<void>}
 */
const sendVerificationEmail = async (to, verificationToken) => {
    const content = generateVerificationContent(verificationToken);
    await sendEmail({
        to,
        ...content
    });
};

module.exports = {
    sendPasswordResetEmail,
    sendVerificationEmail
};