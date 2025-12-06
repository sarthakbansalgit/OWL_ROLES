import nodemailer from 'nodemailer';

const sendMail = async (options) => {
    try {
        // Create a transporter using the recruiter's email credentials dynamically
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: options.fromUser, // Recruiter's email
                pass: options.fromPass, // Recruiter's email password
            },
        });

        // Send the email
        await transporter.sendMail({
            from: `"${options.recruiterName}" <${options.fromUser}>`, // Recruiter's email and name
            to: options.to, // Applicant's email
            subject: options.subject,
            text: options.text,
            html: options.html,
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export default sendMail;
