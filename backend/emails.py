import smtplib, ssl, os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

sender_email = "cpher1761@gmail.com"
password = os.environ.get("PASS")

receiver_email = "cpher1761@gmail.com"
message = MIMEMultipart("alternative")
message["Subject"] = "Hello from ???"
message["From"] = sender_email
message["To"] = receiver_email

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

part1 = MIMEText(text, "plain")
part2 = MIMEText(html, "html")

# Add HTML/plain-text parts to MIMEMultipart message
# The email client will try to render the last part first
message.attach(part1)
message.attach(part2)

port = 465  # For SSL
context = ssl.create_default_context() # Create a secure SSL context

with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, message.as_string())
    print(f"email sent to {sender_email}")
