"""
Used to send emails to users, it currently uses a burner
gmail account created for this project. Emailing will not
work until a new email and password is set.
"""

import os
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_email(receiver_email, subject, text_body, html_body):
    # email,password should be put in config.py
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
