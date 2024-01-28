import subprocess
import sys
import os

def run_command(command):
    subprocess.run(command, shell=True, check=True)

def activate_venv():
    if sys.platform.startswith('win'):
        if 'PSVersionTable' in os.environ:
            return ".venv\\Scripts\\Activate.ps1 ;"
        elif 'CMDCMDLINE' in os.environ:
            return ".venv\\Scripts\\activate.bat &"
    else:
        return "source .venv/bin/activate &&"
    

def setup():
    python, pip = ('python3', 'pip3') if 'python3' in sys.executable else ('python', 'pip')
    # Create virtual environment
    run_command(f"{python} -m venv .venv")

    # Activate virtual environment within subprocess
    activate_command = activate_venv()

    # Install Python dependencies
    run_command(f"{activate_command} {pip} install -r requirements.txt")

    # Install Node.js dependencies in the frontend directory
    os.chdir("frontend")
    run_command("npm install")

if __name__ == "__main__":
    setup()

