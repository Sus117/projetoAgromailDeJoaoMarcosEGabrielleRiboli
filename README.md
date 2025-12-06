# projetoAgromailDeJoaoMarcosEGabrielleRiboli

Abra o terminal do VS Studio Code:

Ctrl + `

Crie uma maquina virtual digitando:

python -m venv venv

Ative esta maquina virtual digitando:

Se estiver no Git Bash digite:

source venv/Scripts/activate

Se estiver no Command Prompt digite:

venv\Scripts\activate.bat

Se estiver no PowerShelll digite:

venv\Scripts\Activate.ps1 para caso não tenha funcionado digite então Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass e depois tente ativar novamente.

Ative o Flask:

pip install flask

Baixe requerimentos atualizados, não precisa excluir os atuais:

pip install -r requirements.txt

Digite agora:

python app.py
