#Primeira Etapa - Fazer o Download
-----------------------------------------------------------------
Primeiro método de download:

Crie uma pasta no explorador de arquivos

Agora abra ela no VS Studio Code:

Para isto digite Ctrl + k e depois Ctrl + o e agora selecione a pasta criada

Agora abra o terminal; 

Obs: Você deve criar um terminal específico:

Clique em +v e selecione agora um terminal Git Bash.

Com o terminal aberto digite isto então:

clone https://github.com/Sus117/projetoAgromailDeJoaoMarcosEGabrielleRiboli.git

Concluído isto avançe para #Segunda Etapa

-----------------------------------------------------------------
Segundo método de download:

Clique em um botão verde chamado Code

Clique em Download ZIP, botão que se encontra abaixo de Open with GitHub Desktop

Agora aguarde o download finalizar

Agora abra o explorador de arquivos e extraia a pasta baixada

Agora abra esta mesma pasta no VS Studio Code:

Para isto digite Ctrl + k e depois Ctrl + o e agora selecione a pasta extraida

Ela será a primeira a aparecer

Agora abra o terminal;

Obs: Aqui você possuí 3 Opções de terminal, PowerShell, Git Bash ou Command Prompt

Sinta-se confortavél em escolher qualquer uma das três opções.

Concluído isto avançe para #Segunda Etapa

-----------------------------------------------------------------
#Segunda Etapa - Rodar o arquivo baixado
-----------------------------------------------------------------
Crie agora uma maquina virtual digitando:

python -m venv venv

Agora para ativar esta maquina virtual criada, considere antes o seguinte:

Se estiver no Git Bash digite: source venv/Scripts/activate

Se estiver no Command Prompt digite: venv\Scripts\activate.bat

Se estiver no PowerShelll digite: venv\Scripts\Activate.ps1 
Caso não funcione digite comando siga digitando: Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass 
Depois digite novamente: venv\Scripts\Activate.ps1

Baixe agora requerimentos atualizados, não precisa excluir os atuais:

pip install -r requirements.txt

Ele se utiliza também de um pacote sobressalente, então digite:

pip install cryptography

Agora ative o Flask:

pip install flask

Para finalizar apenas digite:

python app.py

O arquivo irá abrir no seu Browser padrão, caso deseje mudar apenas vá em configurações e selecione em arquivos .html em qual ferramenta ele deverá ser aberto.
