# Mise à l’essai

Il n’y a pas d’environnement d’essai pour GC Notification. Tous les essais ont lieu dans l’environnement de production. 

## Test de détection de fumée

Si vous devez effectuer un test de détection de la fumée de votre intégration avec GC Notification régulièrement, vous devriez utiliser les adresses de courriel et numéros de téléphone suivants pour le test de détection de fumée.

|Adresse de courriel|
|:---|
|simulate-delivered@notification.canada.ca|
|simulate-delivered-2@notification.canada.ca|
|simulate-delivered-3@notification.canada.ca|

|Numéro de téléphone|
|:---|
|+16132532222|
|+16132532223|
|+16132532224|

Les adresses courriel et les numéros de téléphone du test de détection de fumée valident la demande et simulent une réponse réussie, mais n’envoient pas de message réel, ne produisent pas d’accusé de réception ou ne stockent pas la notification dans la base de données.

Vous pouvez utiliser ces numéros et adresses de test de détection de fumée avec n’importe quel [type de clé API](cles.md).

Vous pouvez effectuer un test de détection de fumée sur toutes les fonctions client de l’API de GC Notification sauf dans les cas suivants :

- Pour obtenir l’état d’un message
- Pour obtenir l’état de tous les messages

Vous ne pouvez pas utiliser les adresses de courriel ou les numéros de téléphone de test de détection de fumée avec ces fonctions, car ils retournent un faux `notification_ID`. Si vous devez tester ces fonctions, utilisez une clé API de test et tout autre numéro de téléphone ou adresse de courriel.

## Autres essais

Utilisez une [clé API de test](cles.md) pour effectuer des tests autres que de détection de fumée, comme les tests de performance ou d’intégration. Vous pouvez utiliser n’importe quelle adresse de courriel ou numéro de téléphone de test autre que de détection de fumée. Vous n’avez pas besoin d’un compte de test GC Notification autre que votre compte habituel.
