from sqlalchemy import Column, Integer, String, Boolean, Float, Text, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()

class Trade(Base):
    __tablename__ = 'trades'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    sector = Column(String)
    description = Column(Text)
    duration = Column(String)
    minimum_qualification = Column(String)
    nsqf_level = Column(Integer)
    skills = Column(Text)
    job_roles = Column(Text)
    salary_range = Column(String)
    placement_rate = Column(Float)
    higher_education_path = Column(Text)
    career_progression = Column(Text)
    safety_information = Column(Text)
    state = Column(String)
    district = Column(String)
    data_source = Column(String)
    source_url = Column(String)
    verification_status = Column(String, default='DEMO')
    last_verified = Column(DateTime, default=datetime.utcnow)

class LearnerProfile(Base):
    __tablename__ = 'learner_profiles'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    location = Column(String)
    interests = Column(Text)
