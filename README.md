# projetoAgromailDeJoaoMarcosEGabrielleRiboli
-------------------------------------------------------------
Primeiro método de download:
-----------------------------------------------------------------
Crie uma pasta no gerenciador de arquivos

Agora abra ela no vs studio code:

Digite Ctrl + k e depois Ctrl + o

Abra o terminal do VS Studio Code pelo seguinte atalho:

Ctrl + `

Após selecionar a pasta, e com o terminal aberto isto digite então:

clone https://github.com/Sus117/projetoAgromailDeJoaoMarcosEGabrielleRiboli.git

Crie agora uma maquina virtual digitando:

python -m venv venv

Agora para ativar esta maquina virtual criada, considere antes o seguinte:

Se estiver no Git Bash digite: source venv/Scripts/activate

Se estiver no Command Prompt digite: venv\Scripts\activate.bat

Se estiver no PowerShelll digite: venv\Scripts\Activate.ps1 
Caso não funcione digite comando siga digitando: Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass 
Depois digite novamente: : venv\Scripts\Activate.ps1 .

Baixe agora requerimentos atualizados, não precisa excluir os atuais:

pip install -r requirements.txt

Ele se utiliza também de um pacote sobressalente, então digite:

pip install cryptography

Agora ative o Flask:

pip install flask

Digite agora:

python app.py
