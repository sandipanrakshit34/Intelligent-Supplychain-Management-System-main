import sys
import os

# Add the application directory to the sys.path
sys.path.insert(0, os.path.dirname(__file__))

from app import app as application
