# Padel for Angels

Site du tournoi caritatif de padel au profit de la fondation [Tierra's Angels](https://www.tierrasangels.org/).

Construit avec Next.js (App Router) + TypeScript + Tailwind CSS, et Supabase (base de données + stockage + auth) pour les inscriptions, les dons et le back-office.

## Fonctionnalités

- Site bilingue FR / ES (`/fr`, `/es`) avec sélecteur de langue.
- Page tournoi (infos à compléter), page fondation (contenu Tierra's Angels), accueil.
- **Inscription** : formulaire équipe → instructions de paiement Bizum → référence + preuve de paiement (optionnelle) → enregistrement en base avec statut `pending`.
- **Don libre** : mêmes coordonnées Bizum, formulaire optionnel (nom, montant, message, preuve).
- **Back-office admin** (`/admin`) : connexion Supabase Auth, liste des inscriptions/dons, confirmation manuelle du statut (`pending` / `confirmed` / `rejected`), visualisation des preuves de paiement (URL signée temporaire).

## Pourquoi une confirmation manuelle ?

Bizum est un système de virement P2P espagnol sans API publique permettant de vérifier automatiquement la réception d'un paiement. Le site enregistre donc chaque inscription/don avec le statut `pending`, et **l'organisateur confirme manuellement** depuis `/admin` une fois le virement Bizum vérifié sur le compte bancaire.

## Avant la mise en ligne : à compléter absolument

Dans `src/lib/config.ts` :

```ts
export const BIZUM_PHONE = "[NUMERO_BIZUM]";   // → le numéro de téléphone Bizum du compte familial
export const BIZUM_HOLDER = "[NOM_TITULAIRE]"; // → le nom du titulaire du compte
```

Le prix (`PRICE_PER_PLAYER` = 20 €, `PRICE_PER_TEAM` = 40 €) et l'email de contact (`CONTACT_EMAIL`) sont dans le même fichier.

Les informations du tournoi (date, lieu, format, planning, récompenses) sont actuellement des placeholders « À confirmer » dans `src/i18n/dictionaries.ts` (clé `tournament`, en français et en espagnol) — à mettre à jour dès que les infos seront connues.

## Créer le compte administrateur

1. Ouvre le projet Supabase `padel-for-angels` sur [supabase.com/dashboard](https://supabase.com/dashboard).
2. Va dans **Authentication → Users → Add user**.
3. Renseigne ton email et un mot de passe (tu pourras le changer plus tard).
4. Connecte-toi ensuite sur `/admin` avec ces identifiants.

Toute personne créée ainsi dans Supabase Auth peut se connecter au back-office — n'ajoute que des comptes de confiance.

## Développement local

```bash
npm install
cp .env.example .env.local   # puis renseigne les valeurs (voir ci-dessous)
npm run dev
```

Variables d'environnement (`.env.local`) :

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Ces valeurs sont visibles dans le dashboard Supabase du projet (**Project Settings → API**). Elles sont déjà configurées dans cet environnement de développement.

## Base de données

Tables Supabase (schéma `public`) :

- `registrations` — une ligne par équipe inscrite (joueurs, catégorie, montant, référence Bizum, chemin de la preuve, statut).
- `donations` — une ligne par don libre (donateur optionnel, montant, message, preuve, statut).

Bucket de stockage privé `payment-proofs` pour les captures d'écran/justificatifs de paiement (upload public, lecture réservée aux admins connectés via URL signée).

La sécurité au niveau des lignes (RLS) autorise tout le monde à **insérer** une inscription/don, mais seuls les utilisateurs authentifiés (les admins) peuvent **lire** et **modifier** les statuts.

## Déploiement

Le site est prêt pour un déploiement sur [Vercel](https://vercel.com) :

1. Importe le dépôt GitHub dans Vercel.
2. Ajoute les variables d'environnement `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Déploie.

## Structure du projet

```
src/
  app/
    [lang]/            pages publiques (fr/es) : accueil, tournoi, fondation, inscription, don
    admin/              back-office (login + dashboard), non traduit
  proxy.ts               détection de langue + protection /admin/dashboard
  components/           composants UI partagés (formulaires, header, footer, dashboard admin)
  i18n/                  dictionnaires de traduction fr/es
  lib/
    config.ts            constantes à personnaliser (Bizum, prix, contact)
    supabase/             clients Supabase (navigateur + serveur)
```
