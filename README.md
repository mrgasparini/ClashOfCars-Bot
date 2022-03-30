## Nos ajude a continuar o projeto.

### Smart Chain Wallet(BUSD/BNB):

#### 0x408958B87Bf9F039AE846dd965223B726A1e7A10

### Phantom Wallet(USDT/SOLANA/CLASH):

#### 0x408958B87Bf9F039AE846dd965223B726A1e7A10

### PIX:

09cacf77-a465-482d-b0a8-f37be3235ca1  
![pix](https://raw.githubusercontent.com/mrgasparini/ClashOfCars-Bot/main/readme-images/pix.jpg)

### Paypal:

[Donate:](https://www.paypal.com/donate/?hosted_button_id=Y7TP498CZSBGW)
https://www.paypal.com/donate/?hosted_button_id=Y7TP498CZSBGW
or
eumathrocha@gmail.com

# Sobre:

Este bot tem o seu código aberto, de forma que qualquer pessoa pode vê-lo, fazer uma fork, ou updates.

Desenvolvi esse bot inicialmente para o meu uso pessoal. Eu decidi publica-lo
aqui para ajudar o pessoal e com a esperança de talvez ganhar um trocadinho com
doações. Caso alguém queira realizar algum ajuste ou melhoria de código, irei ver e analisar todas a issues.

## Aviso:

#### Os desenvolvedores do jogo ainda não se pronunciaram sobre o uso de bots é oficialmente. Porém, não me responsabilizo por eventuais penalidades sofridas por quem usar o bot, use por sua própria conta e risco.

## Novas funcionalidades liberadas!!

#### Auto Claim

Para ativar o AutoClaim basta adicionar a seguinte linha no arquivo _.env_. A funcionalidade faz o resgate de sempre do dia que não possuir taxa para resgate(Data de 5 dias antes do atual).

```
AUTO_CLAIM_ENABLE=true
```

Obs: Por padrão funcionalidade fica **_desativada_**, portanto, é necessário ativá-la para que comece a funcionar.

#### Auto Box Purchase

Para ativar o AutoBoxPurchase basta adicionar as seguintes linhas no arquivo _.env_. A funcionalidade faz a compra e a abertura automática de boxes sempre que a conta possuir o valor mínimo de CLASHs configurado pelo próprio usuário. Segue abaixo instruções de configuração da funcionalidade.


```
AUTO_PURCHASE_ENABLE=true
MINIMUM_VALUE_TO_PURCHASE=1000
UNITS_TO_PURCHASE=1
```
- AUTO_PURCHASE_ENABLE: Responsável por inicar ou não o processo de compra. Para ativar o processo, basta colocar o valor *true*. Ex: AUTO_PURCHASE_ENABLE=true
- MINIMUM_VALUE_TO_PURCHASE: Valor mínimo para que a compra seja efetuada. Menor valor aceito: 1000. Ex: O bot só deverá comprar uma box quando o meu saldo em jogo for maior que 1500, logo o valor no arquivo deverá ser: MINIMUM_VALUE_TO_PURCHASE=1501
- UNITS_TO_PURCHASE: Quantidade de boxes que deverá ser adquirida no processo. Caso o número de boxes seja inferior ao número de CLASHs no atual momento, o bot irá comprar o maior número de boxes que for possível. Ex: UNITS_TO_PURCHASE=1

Obs: Por padrão funcionalidade fica **_desativada_**, portanto, é necessário ativá-la para que comece a funcionar.

#### Update Notice

Foi adicionado uma verificação para sempre que a aplicação for reiniciada, verificar se há alguma atualização no repositório

Para que essa função funcione, foi necessário mudar a forma de inicialição da aplicação, agora o bot deverá ser iniciado da seguinte maneira: 

```
npm start
```

# Instalação:

## Windows

#### Baixe e instale o Node pelo [site](https://nodejs.org/en/download/).

## Linux

### Ubuntu

Insira o seguinte comando no terminal:

```
sudo apt update
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get npm
```

## Preparando a aplicação

### Realize o download do codigo no formato zip, e extraia o arquivo.

### Dentro da pasta do bot, altere o arquivo _.env_

```
WALLET_ADDRESS=<ENDEREÇO DA SUA WALLET>
```

Substitua _<ENDEREÇO DA SUA WALLET>_ pelo endereço da sua Wallet.

### Copie o caminho até a pasta do bot:

![caminho](https://raw.githubusercontent.com/mrgasparini/ClashOfCars-Bot/main/readme-images/address.png)

### Abra o terminal.

Aperte a tecla do windows + r e digite "cmd":

![launch terminal](https://raw.githubusercontent.com/mrgasparini/ClashOfCars-Bot/main/readme-images/cmd.png)

### Navegue até a pasta do bot:

Digite o comando "cd" + caminho que você copiou:

![cd](https://raw.githubusercontent.com/mrgasparini/ClashOfCars-Bot/main/readme-images/cd.png)

### Obs: Os passos são os mesmos para quem usa linux. Apenas a forma de abrir o terminal possui uma leve diferença

### Instale as dependências:

```
npm i
```

![npm](https://raw.githubusercontent.com/mrgasparini/ClashOfCars-Bot/main/readme-images/npm.png)

### Pronto! Agora é só iniciar o bot com o comando

```
npm start
```

![run](https://raw.githubusercontent.com/mrgasparini/ClashOfCars-Bot/main/readme-images/node.png)

# Como usar?

Abra o terminal, se ainda não tiver navegado para a pasta do bot dê novamente o comando

```
"cd" + caminho que você copiou
```

Para iniciar use o comando

```
noda index
```

Assim que ele iniciar ele irá chegar se algum carro tem gasolina e ainda não correu. Após as corridas ou caso os carros não tenham gasolina, o bot irá agendar os próximos refuels.
Para que ele funcione é preciso que o arquivo .env seja preenchido corretamente.
Ele vai constantemente checar se você foi desconectado para realizar o login novamente.
A cada 1 hora ele atualiza o token para evitar erros de autenticação.

### Próximas atualizações

- [x] Refuel in correct time
- [x] Race Farm
- [x] Repair Cars
- [x] Run with a car that is already full when starting the application
- [x] Auto farm when bot starts 24 hours after last resupply
- [x] Auto Claim(Optional)
- [X] Auto Purchase Car(Optional)
- [X] Notify when there is an update
- [ ] Implement telegram notice of how much has been farmed after all races

## Curtiu? Dê aquela fortalecida :)

### Smart Chain Wallet(BUSD/BNB):

#### 0x408958B87Bf9F039AE846dd965223B726A1e7A10

### Phantom Wallet(USDT/SOLANA/CLASH):

#### 0x408958B87Bf9F039AE846dd965223B726A1e7A10

### PIX:

09cacf77-a465-482d-b0a8-f37be3235ca1  
![pix](https://raw.githubusercontent.com/mrgasparini/ClashOfCars-Bot/main/readme-images/pix.jpg)

### Paypal:

[Donate:](https://www.paypal.com/donate/?hosted_button_id=Y7TP498CZSBGW)
https://www.paypal.com/donate/?hosted_button_id=Y7TP498CZSBGW
or
eumathrocha@gmail.com
