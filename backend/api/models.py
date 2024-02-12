from app import db
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column


# example model class
class User(db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    username: Mapped[str] = mapped_column(String(30), unique=True)
