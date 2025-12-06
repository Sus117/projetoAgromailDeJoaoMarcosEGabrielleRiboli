# projetoAgromailDeJoaoMarcosEGabrielleRiboli

Abra o terminal do VS Studio Code pelo seguinte atalho:

Ctrl + `

Crie agora uma maquina virtual digitando:

python -m venv venv

Agora para ativar esta maquina virtual criada, considere antes o seguinte:

Se estiver no Git Bash digite: source venv/Scripts/activate

Se estiver no Command Prompt digite: venv\Scripts\activate.bat

Se estiver no PowerShelll digite: venv\Scripts\Activate.ps1 
Caso não funcione digite comando siga digitando: Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass 
Depois digite novamente: : venv\Scripts\Activate.ps1 .

Agora ative o Flask:

pip install flask

Baixe requerimentos atualizados, não precisa excluir os atuais:

pip install -r requirements.txt

Digite agora:

python app.py
