#Primeira Etapa - Fazer o Download
-----------------------------------------------------------------
Primeiro método de download:

Crie uma pasta no gerenciador de arquivos

Agora abra ela no VS Studio Code:

Digite Ctrl + k e depois Ctrl + o

Agora abra o terminal;

Após selecione a pasta, e com o terminal aberto digite isto então:

clone https://github.com/Sus117/projetoAgromailDeJoaoMarcosEGabrielleRiboli.git

Concluído isto avançe para #Segunda Etapa

-----------------------------------------------------------------
Segundo método de download:

Clique em um botão verde chamado Code

Clique em Download ZIP

Após aguardar o download finalizar

Extraia esta pasta dentro do gerenciador de arquivos

Agora abra esta mesma pasta no VS Studio Code:

Digite Ctrl + k e depois Ctrl + o

Agora abra o terminal;

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
