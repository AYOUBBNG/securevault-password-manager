# Rapport Étape 1 - Standardisation du Code & Versioning

## Objectif
Organiser le code, sécuriser les secrets, séparer les configurations
et préparer le projet pour Docker / CI/CD / Kubernetes.

---

## ACTION 1 : Git Init & Branching Model

### QUOI
- Initialisation de Git dans EFMspringboot (backend) et gestion-motsdepasse (frontend).
- Création des branches main (production) et develop (développement).

### POURQUOI
- Protection de la branche main : code stable uniquement.
- Isolation du travail quotidien sur develop.
- Préparation pour CI/CD (build dev sur develop, deploy prod sur main).

### COMMENT
    git init
    git branch -M main
    git checkout -b develop

### RÉSULTAT
✅ 2 repos Git avec branches main + develop.

---

## ACTION 2 : .gitignore & .env.example

### QUOI
- Création de .gitignore dans chaque service + frontend.
- Exclusion de : target/, node_modules/, .env, .idea/, .vscode/, dist/, build/.
- Création de .env.example (template).

### POURQUOI
- DevSecOps : empêcher la fuite de secrets (JWT, DB passwords).
- Performance : exclure les dossiers lourds (node_modules ~200MB, target ~50MB).
- Standardisation : .env.example documente les variables requises.

### COMMENT
Fichiers .gitignore créés / mis à jour :
- EFMspringboot/.gitignore
- EFMspringboot/auth-service/.gitignore
- EFMspringboot/vault-service/.gitignore
- EFMspringboot/gateway-service/.gitignore
- EFMspringboot/discovery-service/.gitignore
- gestion-motsdepasse/.gitignore
- gestion-motsdepasse/.env.example

### RÉSULTAT
✅ Secrets protégés. Repos propres et légers.

---

## ACTION 3 : Spring Profiles (dev / prod)

### QUOI
- Création de application-dev.properties et application-prod.properties.
- Externalisation des secrets en variables d'environnement.

### POURQUOI
- Respect du 12-Factor App : config séparée du code.
- Injection dynamique en Docker / Kubernetes.
- Confort développeur : profil dev par défaut.

### COMMENT
| Service           | Secrets externalisés                        | Env Vars                                              |
|-------------------|---------------------------------------------|-------------------------------------------------------|
| auth-service      | DB URL/User/Password, JWT                   | POSTGRES_URL, POSTGRES_USER, POSTGRES_PASSWORD, JWT_SECRET |
| vault-service     | DB URL/User/Password, AES Secret            | POSTGRES_URL, POSTGRES_USER, POSTGRES_PASSWORD, VAULT_AES_SECRET |
| gateway-service   | JWT, Eureka URL                             | JWT_SECRET, EUREKA_SERVER_URL                         |
| discovery-service | Eureka activation                           | SPRING_PROFILES_ACTIVE                                |

### RÉSULTAT
✅ Aucun secret en clair dans Git.
✅ mvn spring-boot:run -Dspring-boot.run.profiles=dev fonctionne.
✅ Profil prod prêt pour Docker/K8s.

---

## ACTION 4 : Correction structure "nested folders"

### QUOI
- Suppression du niveau de dossier dupliqué (auth-service/auth-service, etc.).
- Aplatissement de la structure.

### POURQUOI
- Spring Initializr génère un ZIP avec un dossier parent.
- Structure plate : EFMspringboot/X/pom.xml (au lieu de X/X/pom.xml).
- Nécessaire pour Docker : COPY pom.xml doit trouver le fichier.
- Nécessaire pour CI/CD : chemins courts et prévisibles.

### COMMENT
Pour chaque service :
    move X\X X-tmp
    rmdir /S /Q X
    rename X-tmp X

Pour vault-service (dossier verrouillé par VSCode) :
    Stop-Process -Name Code -Force
    Stop-Process -Name java -Force
    rmdir /S /Q vault-service
    rename vault-service-tmp vault-service

### RÉSULTAT
✅ Structure finale :
    EFMspringboot/auth-service/pom.xml
    EFMspringboot/discovery-service/pom.xml
    EFMspringboot/gateway-service/pom.xml
    EFMspringboot/vault-service/pom.xml

---

## ACTION 5 : Commit sur develop

### QUOI
- Commit de toutes les modifications sur la branche develop.

### COMMENT
    git add .
    git commit -m "chore(devops): setup Spring Profiles, externalized env vars, and updated .gitignore"

### RÉSULTAT
✅ Étape 1 versionnée sur develop.

---

## PROCHAINE ÉTAPE
Étape 2 : Containerisation Docker Multi-stage + Docker Compose.