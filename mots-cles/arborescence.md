# Organisation locale du site

Les pages sont des fichiers index.html dans de vrais dossiers. Les URL publiques se terminent par /.

- / : accueil
- /services/ : catalogue
- /services/syndrome-diogene/ : prestation
- /services/syndrome-diogene/paris-75/ : département
- /services/syndrome-diogene/paris-75/paris-18e/ : arrondissement
- /services/logement-insalubre/ : prestation
- /services/apres-deces/ : prestation
- /services/scene-de-crime/ : prestation
- /tarifs/ : tarifs
- /zones/ : zone de 200 km autour de Paris, avec premiers départements présentés

Les autres départements et villes sont à ajouter progressivement suivant structure-locale.json, avec leur propre contenu utile. Aucune page vide n’est publiée. Tous les niveaux actifs ont une page et un fil d’Ariane. Les liens des pages déplacées ont été réécrits pour conserver CSS, scripts et navigation depuis tous les sous-dossiers.

## Anciennes URL
Les anciens .html servent de passerelle locale. _redirects (hébergeurs compatibles) et .htaccess (Apache avec mod_rewrite) préparent les redirections permanentes 301. Activer uniquement la configuration adaptée à l’hébergeur, puis vérifier ses réponses HTTP. Le serveur Python ignore ces configurations et utilise la passerelle HTML.

## Avant mise en ligne
Confirmer le domaine définitif pour générer les canonical absolues, BreadcrumbList et sitemap.xml. Ne pas utiliser le domaine concurrent. Compléter identité, téléphone, photos et éléments commerciaux vérifiables. Les fichiers de mots-clés et de préparation sont internes : les exclure du répertoire publié.

Les dossiers ne garantissent aucun classement. La structure doit rester simple et servir la navigation ; chaque page locale doit apporter des informations utiles. Éviter de multiplier des pages ne différant que par le nom de la commune.

## Couverture géographique
Paris et rayon de 200 km autour de Paris. La liste actuelle des départements est indicative et non exhaustive. Ajouter les communes pertinentes de la zone sans limiter le site aux dix départements initiaux. Ne pas confondre présence d’une commune dans le rayon avec couverture de tout son département.

## Positionnement général
Activité principale : nettoyage extrême. Le syndrome de Diogène est une prestation, au même niveau que le logement insalubre, le nettoyage après décès et la scène de crime. L’accueil et les pages transversales présentent l’ensemble de l’activité ; les pages Diogène conservent leur sujet spécifique. La dénomination descriptive provisoire affichée est Nettoyage Extrême.
