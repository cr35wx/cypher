# Makefile

# Define the virtual environment activation command based on the operating system
ifeq ($(OS),Windows_NT)
    ifeq ($(findstring Powershell, $(SHELL)),Powershell)
        VENV_ACTIVATE = .venv\Scripts\Activate.ps1 ;
    else
        VENV_ACTIVATE = .venv\Scripts\activate.bat &
    endif
else
    VENV_ACTIVATE = source .venv/bin/activate &&
endif

# Define the Python interpreter command based on the operating system
PYTHON_CMD = $(if $(filter $(OS),Windows_NT),python,python3)

.PHONY: setup install-node create-venv install-python-deps

setup: create-venv install-python-deps install-node

create-venv:
	$(PYTHON_CMD) -m venv .venv

install-python-deps: create-venv
	$(VENV_ACTIVATE) pip3 install -r requirements.txt

install-node:
	cd frontend && npm install

# Add other targets/rules as needed

