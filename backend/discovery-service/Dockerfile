# ==========================================
#  Build (compilation du JAR)
# ==========================================
FROM maven:3.9-eclipse-temurin-17-alpine AS builder

WORKDIR /app

# Optimisation du cache Docker : copier d'abord le pom.xml
COPY pom.xml .

# Télécharger les dépendances Maven (cache)
RUN mvn dependency:go-offline -B

# Copier le code source et compiler
COPY src ./src
RUN mvn clean package -DskipTests

# ==========================================
#  Runtime (exécution du JAR)
# ==========================================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# DevSecOps : créer un utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copier uniquement le JAR depuis le stage 1
COPY --from=builder /app/target/*.jar app.jar

# Donner les droits à appuser
RUN chown -R appuser:appgroup /app

# Basculer sur l'utilisateur non-root
USER appuser

# Port Eureka Server
EXPOSE 8761

# Healthcheck : vérifier que Spring Boot Actuator répond
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8761/actuator/health || exit 1

# Lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]