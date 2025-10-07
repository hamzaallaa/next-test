# Visionyze – Test Fullstack

## 🎯 Objectif
Créer une mini app Next.js + Stripe (mode test) avec persistance PostgreSQL (Prisma) et un mini dashboard `/admin`.

## ✅ Fonctionnalités implémentées
1. **Checkout Stripe** (mode test): redirection depuis `/api/checkout`.
2. **Webhook Stripe**: vérification de la signature, traitement de `checkout.session.completed`, persistance en DB (table `Payment`).
3. **Prisma + PostgreSQL**: utilisation du modèle existant, migrations et accès DB.
4. **Dashboard `/admin`**: liste des 50 derniers paiements + total (centimes), colonnes (date, montant, devise, statut, session, email).
5. **Docker**: `docker compose up` lance l'app + Postgres.

## 🧱 Modèle Prisma
Le modèle `Payment` est utilisé pour stocker les informations de paiement provenant de Stripe.

## 🚀 Installation et démarrage

### Développement local
```bash
npm i
cp .env.example .env
# Renseignez STRIPE_SECRET_KEY et STRIPE_WEBHOOK_SECRET
npx prisma migrate dev --name init
npm run dev
# Stripe CLI (terminal séparé):
stripe listen --forward-to http://localhost:3000/api/webhook
```

### Docker
```bash
cp .env.example .env
# Renseignez STRIPE_SECRET_KEY et STRIPE_WEBHOOK_SECRET
docker compose up --build
# Stripe CLI hors conteneur:
stripe listen --forward-to http://localhost:3000/api/webhook
```

## 🧠 Explications des choix techniques

### Mode d'intégration Stripe
J'ai choisi d'utiliser l'API Checkout de Stripe avec redirection vers leur page de paiement pour plusieurs raisons :
- Simplicité d'implémentation et maintenance réduite
- Sécurité gérée par Stripe (pas de données de carte sur notre serveur)
- Conformité PCI DSS automatique

### Limites en production
- La redirection vers un site externe peut affecter l'expérience utilisateur
- Personnalisation limitée du processus de paiement
- Dépendance à la disponibilité des serveurs Stripe

### Points d'amélioration
- Ajouter une pagination plus sophistiquée pour le dashboard admin
- Implémenter des filtres et recherches sur les paiements
- Ajouter des notifications par email après paiement
- Mettre en place des tests automatisés pour les routes API
- Améliorer la gestion des erreurs et les retours utilisateur
