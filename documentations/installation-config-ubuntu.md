## Installation de l'OS ubuntu en Dual Boot

https://lecrabeinfo.net/installer-ubuntu-20-04-lts-dual-boot-windows-10.html

Si installation impossible, utilisez la VM avec l'outil fourni par le CESI, avec le point négatif d'avoir de moins bonnes perf.

## Configuration de l'environnement de travail sous Linux

Une fois que ubuntu est prêt, installer son IDE.
VS Code, Sublime, PHPStorm, JetBrains sont dispos sur le ubuntu software (le store de Ubuntu).

## Installation de Docker

```shell
sudo apt-get update


sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

```

On récupère aussi la clé officiel GPG

```shell
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

Nous allons ensuite utiliser cette clé afin de verifier l'empreinte en s'assurant que le résultat de la commande qui suit est bien égal a  9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88

```shell
sudo apt-key fingerprint 0EBFCD88
``` 

Si tout fonctionne, on doit observer ce résultat :
```shell
pub   rsa4096 2017-02-22 [SCEA]
      9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
uid           [ unknown] Docker Release (CE deb) <docker@docker.com>
sub   rsa4096 2017-02-22 [S]
```

On fini par la commande suivante afin de mettre en place le repository de Docker (version stable)

```shell
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

Pour finir 

```shell
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Pour tester votre installation, lancez votre premier container :
```shell
sudo docker run hello-world
```

### Installation de Docker Compose 

```shell 
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

Si vous avez eu une erreur sur les précédentes commandes, c'est peut être à cause du chemin d'accès, ainsi vous pouvez essayer de créer un lien symbolique via la commande 

```shell 
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

Dans le cas contraire, vous pouvez verifier votre installation via la commande :

```shell
docker-compose --version 
``` 

#### Fludifier votre utilisation de docker avec l'ajout du groupe Docker 

Une dernière étape optionelle mais nécessaire, ajouter l'utilisateur courant dans la liste des utilisateurs autorisés à executer du Docker ou Docker-compose
car dans le cas contraire, il faudra ajouter 'sudo' comme préfixe sur chaque commandes docker ..

```shell 
sudo groupadd docker
sudo gpasswd -a $USER docker

docker run hello-world
```