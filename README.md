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
#Segunda Etapa - Rodar o arquivo baixado
-----------------------------------------------------------------
Crie agora uma maquina virtual digitando:

python -m venv venv

Agora para ativar esta maquina virtual criada, considere antes o seguinte:

Dentro do Git Bash mesmo digite então: source venv/Scripts/activate

Baixe agora requerimentos atualizados, não precisa excluir os atuais:

pip install -r requirements.txt

Ele se utiliza também de um pacote sobressalente, então digite:

pip install cryptography

Agora ative o Flask:

pip install flask

Para finalizar apenas digite:

python app.py

O arquivo irá abrir no seu Browser padrão, caso deseje mudar apenas vá em configurações e selecione em arquivos .html em qual ferramenta ele deverá ser aberto.
