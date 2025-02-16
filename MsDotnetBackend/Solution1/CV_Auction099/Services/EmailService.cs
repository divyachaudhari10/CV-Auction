namespace CV_Auction099.Service
{
    public interface EmailService
    {
        void SendEmail(string toEmail, string subject, string body);
    }
}
