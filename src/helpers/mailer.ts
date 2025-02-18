import nodemailer from 'nodemailer'
import User from '@/model/userModel'
import bcryptjs from 'bcryptjs'



export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        let path = ""
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                })

                path = "verifytoken"
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpry: Date.now() + 3600000
                })

                path = "forgotpassword/change-password"
        }

        
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "ae245e1fd8db6d",
                pass: process.env.NODEMAILER_PASS!
            }
        });

        const mailOptions = {
            from: "deepu@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? 'Verify Your Email' : 'Reset Your Password',
            html: `<p>Click <a href="${process.env.domain}/${path}?token=${hashedToken}">here</a> to${emailType === 'VERIFY' ? 'verify your email ' : 'reset your password'}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message)
    }
}