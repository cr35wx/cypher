import smtplib, ssl, os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


text = """\
Hi,
How are you?
"""

html = """\
<html>
  <body>
    <p>Hi,<br>
       <b>How are you?</b><br>
       <a href="http://www.google.com">Hi</a>
    </p>
  </body>
</html>
"""

def send_email(receiver_email, subject, text_body, html_body):
    sender_email = "cpher1761@gmail.com"
    password = os.environ.get("PASS")
    print(password)

    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = sender_email
    message["To"] = receiver_email

    part1 = MIMEText(text_body, "plain")
    part2 = MIMEText(html_body, "html")

    message.attach(part1)
    message.attach(part2)

    port = 465
    context = ssl.create_default_context()

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, message.as_string())
            print(f"Email sent to {receiver_email}")
            return True
    except Exception as e:
        print(f"Failed to send email to {receiver_email}: {e}")
        return False

