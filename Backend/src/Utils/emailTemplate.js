export const emailVerificationTemplate = (name, verificationLink) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification - Zamindar College</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background: white;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #4f46e5;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 28px;
                font-weight: bold;
                color: #4f46e5;
                margin-bottom: 10px;
            }
            .subtitle {
                color: #6b7280;
                font-size: 16px;
            }
            .content {
                margin-bottom: 30px;
            }
            .greeting {
                font-size: 18px;
                color: #1f2937;
                margin-bottom: 20px;
            }
            .message {
                font-size: 16px;
                color: #4b5563;
                margin-bottom: 25px;
                line-height: 1.7;
            }
            .verification-button {
                display: inline-block;
                background: linear-gradient(135deg, #4f46e5, #7c3aed);
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                font-size: 16px;
                text-align: center;
                margin: 20px 0;
                box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
                transition: all 0.3s ease;
            }
            .verification-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(79, 70, 229, 0.4);
            }
            .link-text {
                background: #f3f4f6;
                padding: 15px;
                border-radius: 6px;
                font-family: monospace;
                font-size: 14px;
                color: #374151;
                word-break: break-all;
                margin: 15px 0;
            }
            .security-note {
                background: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
            }
            .social-links {
                margin: 15px 0;
            }
            .social-links a {
                color: #4f46e5;
                text-decoration: none;
                margin: 0 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🎓 Zamindar College</div>
                <div class="subtitle">Student Portal Verification</div>
            </div>
            
            <div class="content">
                <div class="greeting">Hello ${name}! 👋</div>
                
                <div class="message">
                    Welcome to <strong>Zamindar College Student Portal</strong>! We're excited to have you join our academic community.
                </div>
                
                <div class="message">
                    To complete your registration and access all portal features, please verify your email address by clicking the button below:
                </div>
                
                <div style="text-align: center;">
                    <a href="${verificationLink}" class="verification-button">
                        ✅ Verify My Email Address
                    </a>
                </div>
                
                <div class="message">
                    If the button doesn't work, you can copy and paste this link into your browser:
                </div>
                
                <div class="link-text">${verificationLink}</div>
                
                <div class="security-note">
                    <strong>🔒 Security Note:</strong> This verification link will expire in 24 hours for your security. If you didn't create an account with us, please ignore this email.
                </div>
                
                <div class="message">
                    Once verified, you'll be able to:
                    <ul style="color: #4b5563; margin: 15px 0;">
                        <li>Access your student dashboard</li>
                        <li>Submit fee payments</li>
                        <li>View academic records</li>
                        <li>Check notices and announcements</li>
                    </ul>
                </div>
            </div>
            
            <div class="footer">
                <div class="social-links">
                    <a href="#">Website</a> • 
                    <a href="#">Support</a> • 
                    <a href="#">Contact</a>
                </div>
                <div>
                    <strong>Zamindar College</strong><br>
                    Empowering Education, Building Futures<br>
                    📧 support@zamindarcollege.edu.pk<br>
                    📞 +92-XXX-XXXXXXX
                </div>
                <div style="margin-top: 15px; font-size: 12px; color: #9ca3af;">
                    This email was sent to you because you registered on our student portal. 
                    If you have any questions, please contact our support team.
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

export const emailVerificationText = (name, verificationLink) => {
  return `
Hello ${name}!

Welcome to Zamindar College Student Portal!

To complete your registration, please verify your email address by clicking the link below:

${verificationLink}

This link will expire in 24 hours for your security.

If you didn't create an account with us, please ignore this email.

Best regards,
Zamindar College Team
  `;
};
