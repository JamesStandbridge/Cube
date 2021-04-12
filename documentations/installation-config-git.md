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

copiez la clé et rendez vous sur https://www.github.com

Allez dans les options de votre profil

![alt text](https://github.com/JamesStandbridge/Cube/blob/main/documentations/img/github1.png?raw=true)

Puis rubrique SSH and GPG keys

![alt text](https://github.com/JamesStandbridge/Cube/blob/main/documentations/img/github2.png?raw=true)

Vous retrouvez vos clés verifiées

![alt text](https://github.com/JamesStandbridge/Cube/blob/main/documentations/img/github3.png?raw=true)

Faites 'New SSH key'
Dans Title, donnez le nom de votre PC (PC Portable Boulot Greg par exemple)
et dans le champs key, vous collez la clé publique préalablement copiée.
Désormais c'est bon
Ainsi, a chaque fois que vous allez faire une commande git critique (push, pull, remote, etc), au lieu de vous demandez vos identifiants, git va checker l'identité de votre pc (empreinte numérique via la clé) et voir si ca correspond à l'une des clés ajoutées a votre compte github)
