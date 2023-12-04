class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:16199@localhost/cms'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class TestingConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:16199@localhost/cms_test'
    SQLALCHEMY_TRACK_MODIFICATIONS = False