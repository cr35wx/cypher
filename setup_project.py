import subprocess
import sys
import os

def run_command(command):
    subprocess.run(command, shell=True, check=True)

def setup():
    # Create virtual environment
    run_command("python3 -m venv .venv")

    # Activate virtual environment
    if sys.platform.startswith('win'):
        run_command(".venv\\Scripts\\activate")
    else:
        run_command("source .venv/bin/activate")

    # Install Python dependencies
    run_command("pip3 install -r requirements.txt")

    # Install Node.js dependencies in the frontend directory
    os.chdir("frontend")
    run_command("npm install")

if __name__ == "__main__":
    setup()

