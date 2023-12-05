class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:"Your_password"@localhost/cms'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class TestingConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:"Your_password"@localhost/cms_test'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
