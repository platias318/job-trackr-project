import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendVerificationCode = async (email: string, code: string) => {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "Your login code for jobTrackr",
    html: `<p>Your verification code for logging in on job trackr is: <strong>${code}</strong>. It expires in 10 minutes.</p>`,
  });
};
