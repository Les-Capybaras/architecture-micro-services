# __Architecture logiciel__

## Procédure d'installations des différents modules

### Microservices

L'application est composé de 5 microservices. ls tournent respectivement sur les ports 8080, 8081, 8082, 8083, 8084. Ces ports sont les mêmes pour le réseau interne à docker, comme pour ceux exterieurs. Ces ports doivent donc être disponible, et non utilisés par d'autre application.

Ces microservices sont containerizer via Docker, et peuvent être initialiser par la commande suivante :

```
$ docker-compose up
```

### API Gateway

L'API gateway est la passerrelle entre le client et les microservices. Le client ne peut accéder aux microservices (à part en local pour faciliter le développement => cors: 0.0.0.0), cependant, il peut communiquer avec cette api, qui elle même à la possibilité d'échanger avec les 3 microservices précédents.

Cette API, tourne sous un server NodeJs (+ framework expressJs) sur le port 3001, et peut être instancier par les commandes suivantes :

```
$ npm i 
$ node index
```

## Pré-requis

- Docker
- Node
- NPM

<br>

## Dépot SCM

Le projet est disponible à l'adresse URL suivante : https://github.com/Les-Capybaras/architecture-micro-services
