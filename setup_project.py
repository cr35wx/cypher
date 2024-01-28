import subprocess
import sys
import os

def run_command(command):
    subprocess.run(command, shell=True, check=True)

def activate_venv():
    if sys.platform.startswith('win'):
        return ".venv\\Scripts\\Activate.ps1 ;"
    else:
        return "source .venv/bin/activate &&"
    

def setup():
    # Create virtual environment
    run_command("python3 -m venv .venv")

    # Activate virtual environment within subprocess
    activate_command = activate_venv()

    # Install Python dependencies
    run_command(f"{activate_command} pip3 install -r requirements.txt")

    # Install Node.js dependencies in the frontend directory
    os.chdir("frontend")
    run_command("npm install")

if __name__ == "__main__":
    setup()

