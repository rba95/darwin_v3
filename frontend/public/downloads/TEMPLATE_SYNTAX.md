# 📄 Syntaxe des Templates Word avec docxtpl

## Introduction

`docxtpl` utilise la syntaxe **Jinja2** pour injecter des données dynamiques dans un document Word (.docx). Ce guide explique comment créer et utiliser des templates.

---

## 🔤 Variables Simples

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

**Données Python :**
```python
data = {
    "titre_projet": "Darwin V3",
    "chef_projet": "Rayane",
    "date": "17/02/2026"
}
```

**Résultat :**
```
Projet : Darwin V3
Chef de projet : Rayane
Date : 17/02/2026
```

---

## 🔁 Boucles (Listes)

Pour itérer sur une liste, utilise `{% for %}` et `{% endfor %}` :

```
{% for item in liste %}
• {{ item.propriete }}
{% endfor %}
```

### ✅ Syntaxe CORRECTE (dans des paragraphes)

Chaque balise Jinja2 doit être dans son **propre paragraphe** :

```
{% for acteur in acteurs %}
• {{ acteur.nom }} - {{ acteur.role }}
{% endfor %}
```

**Données Python :**
```python
data = {
    "acteurs": [
        {"nom": "Équipe Dev", "role": "Développement"},
        {"nom": "Équipe Ops", "role": "Production"},
        {"nom": "Admin", "role": "Administration"}
    ]
}
```

**Résultat :**
```
• Équipe Dev - Développement
• Équipe Ops - Production
• Admin - Administration
```

### ❌ Syntaxe à ÉVITER

Ne mets **PAS** tout sur une seule ligne :
```
{% for acteur in acteurs %}• {{ acteur.nom }}{% endfor %}
```
Cela peut causer des erreurs !

---

## 🔀 Conditions

Pour afficher du contenu conditionnellement :

```
{% if condition %}
Contenu affiché si vrai
{% endif %}
```

**Avec else :**
```
{% if has_data %}
Données disponibles : {{ data }}
{% else %}
Aucune donnée disponible.
{% endif %}
```

**Exemple concret :**
```
{% if vms %}
Liste des machines virtuelles :
{% for vm in vms %}
• {{ vm.nom }}
{% endfor %}
{% else %}
Aucune VM définie.
{% endif %}
```

---

## 📊 Tableaux Dynamiques (Avancé)

Pour les tableaux Word avec lignes dynamiques, utilise `{%tr %}` :

```
{%tr for row in rows %}
{{ row.col1 }} | {{ row.col2 }} | {{ row.col3 }}
{%tr endfor %}
```

### ⚠️ ATTENTION - Règles importantes :

1. `{%tr for %}` doit être dans la **première cellule** de la ligne
2. `{%tr endfor %}` doit être dans la **dernière cellule** de la même ligne
3. La ligne entière sera dupliquée pour chaque élément

**Structure du tableau Word :**

| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|-----------|-----------|
| `{%tr for item in items %}{{ item.a }}` | `{{ item.b }}` | `{{ item.c }}{%tr endfor %}` |

### 💡 Alternative Recommandée

Si les tableaux dynamiques posent problème, utilise plutôt des **listes à puces** :

```
{% for vm in vms %}
• {{ vm.nom }} ({{ vm.cpu }} CPU, {{ vm.ram }} GB RAM)
{% endfor %}
```

C'est plus simple et plus fiable !

---

## 🖼️ Images Dynamiques

Pour insérer des images :

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

## 📝 Filtres Jinja2

Tu peux transformer les valeurs avec des filtres :

| Filtre | Description | Exemple |
|--------|-------------|---------|
| `upper` | Majuscules | `{{ nom\|upper }}` → `RAYANE` |
| `lower` | Minuscules | `{{ nom\|lower }}` → `rayane` |
| `title` | Titre | `{{ nom\|title }}` → `Rayane` |
| `default` | Valeur par défaut | `{{ nom\|default('N/A') }}` |
| `length` | Longueur | `{{ liste\|length }}` → `3` |

**Exemple :**
```
Projet : {{ titre_projet|upper }}
Nombre d'acteurs : {{ acteurs|length }}
Contact : {{ email|default('Non renseigné') }}
```

---

## 🧪 Exemple Complet

### Template Word (`template.docx`)

```
DOSSIER D'ARCHITECTURE TECHNIQUE
{{ titre_projet }}

Chef de projet : {{ chef_projet }}
Date : {{ date }}

1. ACTEURS
{% for acteur in acteurs %}
• {{ acteur.nom }} - {{ acteur.role }} ({{ acteur.droits }})
{% endfor %}

2. MACHINES VIRTUELLES
{% if vms %}
{% for vm in vms %}
• {{ vm.nom }} : {{ vm.cpu }} CPU, {{ vm.ram }} GB RAM
{% endfor %}
{% else %}
Aucune VM définie.
{% endif %}
```

### Code Python

```python
from docxtpl import DocxTemplate

# Charger le template
doc = DocxTemplate("template.docx")

# Données à injecter
data = {
    "titre_projet": "Darwin V3",
    "chef_projet": "Rayane",
    "date": "17/02/2026",
    "acteurs": [
        {"nom": "Dev Team", "role": "Développement", "droits": "Admin"},
        {"nom": "Ops Team", "role": "Production", "droits": "Lecture"}
    ],
    "vms": [
        {"nom": "SRV-APP-01", "cpu": 4, "ram": 16},
        {"nom": "SRV-DB-01", "cpu": 8, "ram": 32}
    ]
}

# Générer le document
doc.render(data)
doc.save("output.docx")
```

---

## 🚨 Erreurs Courantes

| Erreur | Cause | Solution |
|--------|-------|----------|
| `Unknown tag 'endfor'` | Syntaxe incorrecte dans le template | Vérifie que `{% for %}` et `{% endfor %}` sont dans des paragraphes séparés |
| `UndefinedError` | Variable non définie | Ajoute une valeur par défaut : `{{ var\|default('') }}` |
| `TypeError` | Mauvais type de données | Vérifie que tu passes un `dict` et non un objet Pydantic (utilise `.model_dump()`) |

---

## 📚 Ressources

- [Documentation docxtpl](https://docxtpl.readthedocs.io/)
- [Syntaxe Jinja2](https://jinja.palletsprojects.com/templates/)
- [python-docx](https://python-docx.readthedocs.io/)

---

## ✅ Bonnes Pratiques

1. **Utilise des valeurs par défaut** pour éviter les erreurs si un champ est vide
2. **Préfère les listes à puces** aux tableaux dynamiques (plus fiable)
3. **Teste ton template** avec des données minimales avant d'ajouter de la complexité
4. **Sépare les balises Jinja2** dans leurs propres paragraphes
5. **Convertis les objets Pydantic** en dict avec `.model_dump()` avant le rendu
