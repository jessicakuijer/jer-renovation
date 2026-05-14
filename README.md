# JER Rénovation — Site vitrine

Site statique multipage (**Vite** + HTML + TypeScript/CSS), destiné au déploiement sur **`jer-renovation.fr`**.

## Prérequis

- Node.js récent  
- **pnpm** (`corepack enable` puis utilisation du gestionnaire du projet si besoin)

## Commandes

| Commande          | Description                                                                 |
|-------------------|------------------------------------------------------------------------------|
| `pnpm install`    | Dépendances                                                                  |
| `pnpm dev`        | Serveur de dev                                                               |
| `pnpm build`      | Sortie dans `dist/`                                                          |
| `pnpm preview`    | Prévisualisation du build                                                    |
| `pnpm images:build` | Conversion / pipeline images services (Sharp)                             |
| `pnpm images:works` | JPG/PNG/TIFF dans `src/assets/images/works/` → `.webp`, sources supprimées |

## Variables d’environnement (build)

Pour les URLs absolues Open Graph dans le HTML, définissez :

```bash
VITE_SITE_ORIGIN=https://jer-renovation.fr
```

(Chargées par Vite via `vite.config.ts` depuis un fichier `.env` à la racine si besoin.)

## Structure rapide

- Pages HTML à la racine (entrées Vite configurées dans `vite.config.ts`)
- Logique commune : `src/main.ts`, `src/app.ts`, styles `src/styles/main.css`
- Médias : `public/` (logos, favicon), assets buildés depuis `src/assets/`
