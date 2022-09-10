# Javascript home made boilerplate

## Content
- api-nest node/nestjs backend
- app-angular angular-14/scss frontend

## Install
- docker
- docker-compose
- GNU make :
    - On Windows
        You can install GNU make with chocolatey, a well-maintained package manager, which will add make to the global path and runs on all CLIs (powershell, git bash, cmd, etc…) saving you a ton of time in both maintenance and initial setup to get make running.
        Install the chocolatey package manager for Windows
        compatible to Windows 7+ / Windows Server 2003+
        - choco install make
        - https://community.chocolatey.org/packages/make
    - On Linux 
        It is commonly provide in most of Linux distribution:
        - sudo apt install make
        - https://linuxhint.com/install-make-ubuntu/
        - make --version
    - On Mac
        You will probably need to install the package
        - brew install make
        - https://formulae.brew.sh/formula/make
        - make --version


## Command's
- start and create container: make up
- kill containers: make down
- stop containers: make stop
- restart containers: make start