## Prérequis

- git (installation via ce lien sur linux http://doc.ubuntu-fr.org/git en cliquant sur le petit git en vert et non le lien 'installer le paquet')


### Configuration de l'empreinte

Se positionner a la racine de votre OS

```shell
cd ~
```

Puis générer une nouvelle clé RSA

```shell
ssh-keygen -t rsa
```

La commande précède plusieurs questions, lisez bien pour ne pas vous tromper.
Maintenant récuperez le contenu de votre clé PUBLIQUE, via la commande suivante :

```shell
cat ~/.ssh/id_rsa.pub
```

![alt text](https://github.com/JamesStandbridge/Cube/blob/main/documentations/img/github1.png?raw=true)
