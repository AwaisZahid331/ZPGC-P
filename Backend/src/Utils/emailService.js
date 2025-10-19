import nodemailer from 'nodemailer';
import { emailVerificationTemplate, emailVerificationText } from './emailTemplate.js';
import { EMAIL_USER, EMAIL_PASS, FRONTEND_URL } from './Constants.js';

// Create transporter (using Gmail for demo - you can configure with your SMTP)
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER || 'your-email@gmail.com',
      pass: EMAIL_PASS || 'your-app-password'
    }
  });
};

// Send verification email
export const sendVerificationEmail = async (email, name, verificationToken) => {
  try {
    const transporter = createTransporter();
    
    // Create verification link
    const verificationLink = `${FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${verificationToken}`;
    
    // Email options
    const mailOptions = {
      from: `"Zamindar College" <${EMAIL_USER || 'noreply@zamindarcollege.edu.pk'}>`,
      to: email,
      subject: '🎓 Verify Your Email - Zamindar College Student Portal',
      html: emailVerificationTemplate(name, verificationLink),
      text: emailVerificationText(name, verificationLink)
    };
    
    // Send email
    const result = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, error: error.message };
  }
};

// Test email configuration
export const testEmailConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email server connection successful');
    return true;
  } catch (error) {
    console.error('❌ Email server connection failed:', error);
    return false;
  }
};
