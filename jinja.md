# ðŸ“„ Syntaxe des Templates Word avec docxtpl

## Introduction

`docxtpl` utilise la syntaxe **Jinja2** pour injecter des donnÃ©es dynamiques dans un document Word (.docx). Ce guide explique comment crÃ©er et utiliser des templates.

---

## ðŸ”¤ Variables Simples

Pour afficher une variable, utilise les doubles accolades :

```
{{ nom_variable }}
```

**Exemple dans le template Word :**
```
Projet : {{ titre_projet }}
Chef de projet : {{ chef_projet }}
Date : {{ date }}
```

**DonnÃ©es Python :**
```python
data = {
    "titre_projet": "Darwin V3",
    "chef_projet": "Rayane",
    "date": "17/02/2026"
}
```

**RÃ©sultat :**
```
Projet : Darwin V3
Chef de projet : Rayane
Date : 17/02/2026
```

---

## ðŸ” Boucles (Listes)

Pour itÃ©rer sur une liste, utilise `{% for %}` et `{% endfor %}` :

```
{% for item in liste %}
â€¢ {{ item.propriete }}
{% endfor %}
```

### âœ… Syntaxe CORRECTE (dans des paragraphes)

Chaque balise Jinja2 doit Ãªtre dans son **propre paragraphe** :

```
{% for acteur in acteurs %}
â€¢ {{ acteur.nom }} - {{ acteur.role }}
{% endfor %}
```

**DonnÃ©es Python :**
```python
data = {
    "acteurs": [
        {"nom": "Ã‰quipe Dev", "role": "DÃ©veloppement"},
        {"nom": "Ã‰quipe Ops", "role": "Production"},
        {"nom": "Admin", "role": "Administration"}
    ]
}
```

**RÃ©sultat :**
```
â€¢ Ã‰quipe Dev - DÃ©veloppement
â€¢ Ã‰quipe Ops - Production
â€¢ Admin - Administration
```

### âŒ Syntaxe Ã  Ã‰VITER

Ne mets **PAS** tout sur une seule ligne :
```
{% for acteur in acteurs %}â€¢ {{ acteur.nom }}{% endfor %}
```
Cela peut causer des erreurs !

---

## ðŸ”€ Conditions

Pour afficher du contenu conditionnellement :

```
{% if condition %}
Contenu affichÃ© si vrai
{% endif %}
```

**Avec else :**
```
{% if has_data %}
DonnÃ©es disponibles : {{ data }}
{% else %}
Aucune donnÃ©e disponible.
{% endif %}
```

**Exemple concret :**
```
{% if vms %}
Liste des machines virtuelles :
{% for vm in vms %}
â€¢ {{ vm.nom }}
{% endfor %}
{% else %}
Aucune VM dÃ©finie.
{% endif %}
```

---

## ðŸ“Š Tableaux Dynamiques (AvancÃ©)

Pour les tableaux Word avec lignes dynamiques, utilise `{%tr %}` :

```
{%tr for row in rows %}
{{ row.col1 }} | {{ row.col2 }} | {{ row.col3 }}
{%tr endfor %}
```

### âš ï¸ ATTENTION - RÃ¨gles importantes :

1. `{%tr for %}` doit Ãªtre dans la **premiÃ¨re cellule** de la ligne
2. `{%tr endfor %}` doit Ãªtre dans la **derniÃ¨re cellule** de la mÃªme ligne
3. La ligne entiÃ¨re sera dupliquÃ©e pour chaque Ã©lÃ©ment

**Structure du tableau Word :**

| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|-----------|-----------|
| `{%tr for item in items %}{{ item.a }}` | `{{ item.b }}` | `{{ item.c }}{%tr endfor %}` |

### ðŸ’¡ Alternative RecommandÃ©e

Si les tableaux dynamiques posent problÃ¨me, utilise plutÃ´t des **listes Ã  puces** :

```
{% for vm in vms %}
â€¢ {{ vm.nom }} ({{ vm.cpu }} CPU, {{ vm.ram }} GB RAM)
{% endfor %}
```

C'est plus simple et plus fiable !

---

## ðŸ–¼ï¸ Images Dynamiques

Pour insÃ©rer des images :

```python
from docxtpl import DocxTemplate, InlineImage
from docx.shared import Mm

doc = DocxTemplate("template.docx")
image = InlineImage(doc, "logo.png", width=Mm(50))

data = {"logo": image}
doc.render(data)
```

Dans le template :
```
{{ logo }}
```

---

## ðŸ“ Filtres Jinja2

Tu peux transformer les valeurs avec des filtres :

| Filtre | Description | Exemple |
|--------|-------------|---------|
| `upper` | Majuscules | `{{ nom\|upper }}` â†’ `RAYANE` |
| `lower` | Minuscules | `{{ nom\|lower }}` â†’ `rayane` |
| `title` | Titre | `{{ nom\|title }}` â†’ `Rayane` |
| `default` | Valeur par dÃ©faut | `{{ nom\|default('N/A') }}` |
| `length` | Longueur | `{{ liste\|length }}` â†’ `3` |

**Exemple :**
```
Projet : {{ titre_projet|upper }}
Nombre d'acteurs : {{ acteurs|length }}
Contact : {{ email|default('Non renseignÃ©') }}
```

---

## ðŸ§ª Exemple Complet

### Template Word (`template.docx`)

```
DOSSIER D'ARCHITECTURE TECHNIQUE
{{ titre_projet }}

Chef de projet : {{ chef_projet }}
Date : {{ date }}

1. ACTEURS
{% for acteur in acteurs %}
â€¢ {{ acteur.nom }} - {{ acteur.role }} ({{ acteur.droits }})
{% endfor %}

2. MACHINES VIRTUELLES
{% if vms %}
{% for vm in vms %}
â€¢ {{ vm.nom }} : {{ vm.cpu }} CPU, {{ vm.ram }} GB RAM
{% endfor %}
{% else %}
Aucune VM dÃ©finie.
{% endif %}
```

### Code Python

```python
from docxtpl import DocxTemplate

# Charger le template
doc = DocxTemplate("template.docx")

# DonnÃ©es Ã  injecter
data = {
    "titre_projet": "Darwin V3",
    "chef_projet": "Rayane",
    "date": "17/02/2026",
    "acteurs": [
        {"nom": "Dev Team", "role": "DÃ©veloppement", "droits": "Admin"},
        {"nom": "Ops Team", "role": "Production", "droits": "Lecture"}
    ],
    "vms": [
        {"nom": "SRV-APP-01", "cpu": 4, "ram": 16},
        {"nom": "SRV-DB-01", "cpu": 8, "ram": 32}
    ]
}

# GÃ©nÃ©rer le document
doc.render(data)
doc.save("output.docx")
```

---

## ðŸš¨ Erreurs Courantes

| Erreur | Cause | Solution |
|--------|-------|----------|
| `Unknown tag 'endfor'` | Syntaxe incorrecte dans le template | VÃ©rifie que `{% for %}` et `{% endfor %}` sont dans des paragraphes sÃ©parÃ©s |
| `UndefinedError` | Variable non dÃ©finie | Ajoute une valeur par dÃ©faut : `{{ var\|default('') }}` |
| `TypeError` | Mauvais type de donnÃ©es | VÃ©rifie que tu passes un `dict` et non un objet Pydantic (utilise `.model_dump()`) |

---

## ðŸ“š Ressources

- [Documentation docxtpl](https://docxtpl.readthedocs.io/)
- [Syntaxe Jinja2](https://jinja.palletsprojects.com/templates/)
- [python-docx](https://python-docx.readthedocs.io/)

---

## âœ… Bonnes Pratiques

1. **Utilise des valeurs par dÃ©faut** pour Ã©viter les erreurs si un champ est vide
2. **PrÃ©fÃ¨re les listes Ã  puces** aux tableaux dynamiques (plus fiable)
3. **Teste ton template** avec des donnÃ©es minimales avant d'ajouter de la complexitÃ©
4. **SÃ©pare les balises Jinja2** dans leurs propres paragraphes
5. **Convertis les objets Pydantic** en dict avec `.model_dump()` avant le rendu