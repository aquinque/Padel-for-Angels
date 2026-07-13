# Padel for Angels

Site du tournoi caritatif de padel au profit de la fondation [Tierra's Angels](https://www.tierrasangels.org/).

Construit avec Next.js (App Router) + TypeScript + Tailwind CSS, et Supabase (base de données + stockage + auth) pour les inscriptions, les dons et le back-office.

## Fonctionnalités

- Site bilingue FR / ES (`/fr`, `/es`) avec sélecteur de langue.
- Page tournoi (infos à compléter), page fondation (contenu Tierra's Angels), accueil.
- **Inscription en équipe** : formulaire binôme → instructions de paiement Bizum → référence + preuve de paiement (optionnelle) → enregistrement en base avec statut `pending`.
- **Inscription solo** : un joueur ou une joueuse sans partenaire peut s'inscrire seul(e) (20 €). Dès qu'un deuxième joueur solo s'inscrit, les deux sont **associés automatiquement** en équipe par un déclencheur en base de données, qui leur attribue le nom d'un pays de coupe du monde (ex : « Brésil », « Argentine »...).
- **Cagnotte des équipes** (`/cagnotte`) : un mini-tournoi de collecte de fonds où chaque équipe (inscrite en binôme ou formée par appariement solo) a sa propre page de classement. N'importe qui peut choisir une équipe et lui envoyer un don par Bizum ; un classement public affiche les fonds levés par équipe (uniquement les dons confirmés par l'admin).
- **Don libre** : mêmes coordonnées Bizum, formulaire optionnel (nom, montant, message, preuve), non attribué à une équipe.
- **Back-office admin** (`/admin`) : connexion Supabase Auth, liste des inscriptions (équipe/solo, avec l'équipe assignée) et des dons (généraux ou attribués à une équipe), confirmation manuelle du statut (`pending` / `confirmed` / `rejected`), visualisation des preuves de paiement (URL signée temporaire), et un onglet classement de la cagnotte des équipes.

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

- `teams` — une équipe : soit créée directement (inscription en binôme, `name` = nom choisi), soit auto-formée par appariement de deux joueurs solo (`source = 'solo_pairing'`, `country_code` = code pays attribué).
- `registrations` — une ligne par inscription. `registration_type` vaut `team` (les deux joueurs sont dans la même ligne) ou `solo` (un joueur par ligne, `team_id` rempli automatiquement dès qu'un partenaire est trouvé).
- `donations` — un don, général (`for_team_id` vide) ou attribué à une équipe dans la cagnotte (`for_team_id` rempli).

Un **déclencheur** (`pair_solo_registration`) s'exécute à chaque inscription solo : il cherche un autre joueur solo en attente, crée une équipe avec le prochain nom de pays disponible (liste de 48 pays dans `src/lib/countries.ts`, à synchroniser avec la fonction SQL si tu la modifies), et lie les deux inscriptions à cette équipe.

Une fonction `get_team_fundraising()` (SECURITY DEFINER) expose au public un classement agrégé (équipe, montant levé, nombre de dons confirmés) sans exposer les données personnelles des donateurs.

Bucket de stockage privé `payment-proofs` pour les captures d'écran/justificatifs de paiement (upload public, lecture réservée aux admins connectés via URL signée).

La sécurité au niveau des lignes (RLS) autorise tout le monde à **insérer** une inscription/don/équipe et à **lire** la liste des équipes (nécessaire pour la cagnotte publique), mais seuls les utilisateurs authentifiés (les admins) peuvent **lire** les inscriptions/dons (données personnelles) et **modifier** les statuts.

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
