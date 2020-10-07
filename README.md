# Test awam Celeste MENEGAZZI

Technologies choisies : Symfony et React.

- Pourquoi Symfony et React ? 
	- L'architecture de React en component permettra d'ajouter facilement de nouvelles fonctionnalités si besoin
	- Rapidité, fluidité de React, couplée à sa forte responsivité pourra éviter bien des problèmes de format.
	- Ma maîtrise de React me permet d'être efficace et réactive sur le projet.
	- Symfony offre une plétore de librairies facilitant fortement le travail en back
	- L'architecture Symfony (en MVC) facilite également la maintenance
	- En cas d'ajout de tables, ou de données, via symfony, la création d'entités et de commandes facilitera ces tâches

- Etat actuel du projet;
	- Le form du front est fait avec formik et yup qui permettent de valider les données en front
	- Je ne voulais pas faire les inputs en dur car je voulais pouvoir en rajouter facilement, formik permet de faire ca facilement et il suffirait de décommenter les boutons pour pouvoir rajouter et enlever une input
	- Les devises sont des constantes dans le controller car je ne voulais prendre le temps de connecter une base
	- Les calculs sont stockés dans un fichier mais je n'ai pas créé la commande permettant d'envoyer les calculs par mail.


- Si j'avais eu 10h sur le sujet : 
	- Conception de la db sur papier (currency=> id/symbol/rate (par rapport à l'euro)) 
	- Création d'entités, génération de la database grace à doctrine
	- Création des Repositories liés aux entités selon les queries nécessaires
	- L'ajout de nouvelles currencies pourra se faire via une commande Symfony dans un premier temps, peut être créer une interface admin si le client
	veut créer lui même de nouvelles currencies selon son bon vouloir.
	- Création des Services réalisants les services
	- Validation des données en back avec une entity input
	- Création de la commande symfony qui envoi le mail et vide/supprime le fichier, cette commande serait appellée quotidiennement par un cron
	

- Améliorations possibles : 
	- Ajout d'un backoffice pour manager les currencies, les taux de change
	- Garder un historique des opérations effectuées dans un log dédié, consultable dans l'admin.
	- Ajout de la possibilité de garder le taux de change à jour (il existe probablement des API pour ça)
	- Ajout d'une table de conversion pour chaque monnaie, voire d'un appel api pour aller chercher tous les taux de change des monnaies les unes envers les autres


Pour lancer le projet :

symfony server start 
aller https://localhost:8000/

