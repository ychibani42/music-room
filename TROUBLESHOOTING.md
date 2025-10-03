# Troubleshooting Guide

## Frontend ne démarre pas

### Solution 1: Rebuild les containers
```bash
make down
make build
make up
```

### Solution 2: Vérifier les logs
```bash
# Voir les logs du frontend
docker-compose logs -f frontend

# Voir les logs du backend
docker-compose logs -f backend
```

### Solution 3: Accéder au frontend
Le frontend peut être accessible via plusieurs URLs:
- **Web principale**: http://localhost:19006
- **Metro bundler**: http://localhost:8081
- **Expo DevTools**: http://localhost:19000

### Solution 4: Tester le backend seul
```bash
# Tester que le backend fonctionne
curl http://localhost:8000/api/ping

# Devrait retourner: {"message":"pong","timestamp":"...","status":"healthy"}
```

### Solution 5: Problèmes de dépendances
Si vous voyez des erreurs de dépendances npm:
```bash
# Supprimer le cache et rebuilder
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

## Backend ne répond pas

### Vérifier que le container tourne
```bash
docker-compose ps
```

### Accéder au container
```bash
docker-compose exec backend /bin/bash
```

## Problèmes de connexion Frontend <-> Backend

L'application frontend utilise `http://localhost:8000` pour se connecter au backend.
Cela fonctionne car les deux services exposent leurs ports sur l'hôte.

Si vous rencontrez des erreurs CORS:
- Vérifiez que le backend est bien accessible sur http://localhost:8000
- Les logs du backend devraient montrer les requêtes entrantes

## Ports utilisés

- **8000**: Backend API (FastAPI)
- **8081**: Metro bundler (React Native)
- **19000**: Expo DevTools
- **19006**: Expo Web Interface

Assurez-vous qu'aucun autre service n'utilise ces ports.
