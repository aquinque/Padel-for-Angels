export const COUNTRY_NAMES: Record<string, { fr: string; es: string; flag: string }> = {
  AR: { fr: "Argentine", es: "Argentina", flag: "🇦🇷" },
  BR: { fr: "Brésil", es: "Brasil", flag: "🇧🇷" },
  FR: { fr: "France", es: "Francia", flag: "🇫🇷" },
  DE: { fr: "Allemagne", es: "Alemania", flag: "🇩🇪" },
  ES: { fr: "Espagne", es: "España", flag: "🇪🇸" },
  IT: { fr: "Italie", es: "Italia", flag: "🇮🇹" },
  PT: { fr: "Portugal", es: "Portugal", flag: "🇵🇹" },
  NL: { fr: "Pays-Bas", es: "Países Bajos", flag: "🇳🇱" },
  BE: { fr: "Belgique", es: "Bélgica", flag: "🇧🇪" },
  EN: { fr: "Angleterre", es: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  HR: { fr: "Croatie", es: "Croacia", flag: "🇭🇷" },
  MA: { fr: "Maroc", es: "Marruecos", flag: "🇲🇦" },
  UY: { fr: "Uruguay", es: "Uruguay", flag: "🇺🇾" },
  MX: { fr: "Mexique", es: "México", flag: "🇲🇽" },
  JP: { fr: "Japon", es: "Japón", flag: "🇯🇵" },
  KR: { fr: "Corée du Sud", es: "Corea del Sur", flag: "🇰🇷" },
  US: { fr: "États-Unis", es: "Estados Unidos", flag: "🇺🇸" },
  CA: { fr: "Canada", es: "Canadá", flag: "🇨🇦" },
  SN: { fr: "Sénégal", es: "Senegal", flag: "🇸🇳" },
  GH: { fr: "Ghana", es: "Ghana", flag: "🇬🇭" },
  CH: { fr: "Suisse", es: "Suiza", flag: "🇨🇭" },
  PL: { fr: "Pologne", es: "Polonia", flag: "🇵🇱" },
  RS: { fr: "Serbie", es: "Serbia", flag: "🇷🇸" },
  AU: { fr: "Australie", es: "Australia", flag: "🇦🇺" },
  CR: { fr: "Costa Rica", es: "Costa Rica", flag: "🇨🇷" },
  EC: { fr: "Équateur", es: "Ecuador", flag: "🇪🇨" },
  CM: { fr: "Cameroun", es: "Camerún", flag: "🇨🇲" },
  TN: { fr: "Tunisie", es: "Túnez", flag: "🇹🇳" },
  DK: { fr: "Danemark", es: "Dinamarca", flag: "🇩🇰" },
  NO: { fr: "Norvège", es: "Noruega", flag: "🇳🇴" },
  SE: { fr: "Suède", es: "Suecia", flag: "🇸🇪" },
  GR: { fr: "Grèce", es: "Grecia", flag: "🇬🇷" },
  TR: { fr: "Turquie", es: "Turquía", flag: "🇹🇷" },
  AT: { fr: "Autriche", es: "Austria", flag: "🇦🇹" },
  CZ: { fr: "Tchéquie", es: "Chequia", flag: "🇨🇿" },
  RO: { fr: "Roumanie", es: "Rumania", flag: "🇷🇴" },
  UA: { fr: "Ukraine", es: "Ucrania", flag: "🇺🇦" },
  WA: { fr: "Pays de Galles", es: "Gales", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
  SC: { fr: "Écosse", es: "Escocia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  NG: { fr: "Nigeria", es: "Nigeria", flag: "🇳🇬" },
  EG: { fr: "Égypte", es: "Egipto", flag: "🇪🇬" },
  DZ: { fr: "Algérie", es: "Argelia", flag: "🇩🇿" },
  CI: { fr: "Côte d'Ivoire", es: "Costa de Marfil", flag: "🇨🇮" },
  CO: { fr: "Colombie", es: "Colombia", flag: "🇨🇴" },
  PE: { fr: "Pérou", es: "Perú", flag: "🇵🇪" },
  CL: { fr: "Chili", es: "Chile", flag: "🇨🇱" },
  PY: { fr: "Paraguay", es: "Paraguay", flag: "🇵🇾" },
  SA: { fr: "Arabie Saoudite", es: "Arabia Saudita", flag: "🇸🇦" },
};

export function teamDisplayName(
  team: { name: string; country_code: string | null },
  locale: "fr" | "es"
): string {
  if (team.country_code && COUNTRY_NAMES[team.country_code]) {
    return COUNTRY_NAMES[team.country_code][locale];
  }
  return team.name;
}

export function teamFlag(countryCode: string | null): string {
  if (countryCode && COUNTRY_NAMES[countryCode]) return COUNTRY_NAMES[countryCode].flag;
  return "🎾";
}
