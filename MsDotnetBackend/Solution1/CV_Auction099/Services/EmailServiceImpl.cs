using System.Net.Mail;
using System.Net;

namespace CV_Auction099.Service
{
    public class EmailServiceImpl : EmailService
    {


        public void SendEmail(string toEmail, string subject, string body)
        {
            try
            {
                // Gmail SMTP server configuration
                string smtpServer = "smtp.gmail.com";
                int smtpPort = 587;  // Use 465 for SSL

                // Your Gmail credentials
                string fromEmail = "cvauction02@gmail.com";  // Replace with your Gmail email
                string password = "meaimvlunnvvlfze";  // Use App Password if 2FA is enabled

                // Create a new MailMessage object
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(fromEmail, "CV-Auction");
                mail.To.Add(new MailAddress(toEmail));
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;  // If your email has HTML content

                // Set up the SMTP client
                SmtpClient smtp = new SmtpClient(smtpServer, smtpPort);
                smtp.Credentials = new NetworkCredential(fromEmail, password);
                smtp.EnableSsl = true;

                // Send the email
                smtp.Send(mail);
                Console.WriteLine("Email sent successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }

    }
}
