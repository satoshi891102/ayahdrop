export interface CardStyle {
  id: string;
  name: string;
  premium: boolean;
  // Background
  bgGradient: string;
  // Text colors
  arabicColor: string;
  translationColor: string;
  referenceColor: string;
  // Decorative
  borderStyle?: string;
  ornamentColor?: string;
  // Font sizing
  arabicSize: string;
  translationSize: string;
}

export const CARD_STYLES: CardStyle[] = [
  {
    id: "midnight-gold",
    name: "Midnight Gold",
    premium: false,
    bgGradient: "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)",
    arabicColor: "#C9A84C",
    translationColor: "#E8E8E8",
    referenceColor: "#8B8B8B",
    ornamentColor: "#C9A84C",
    arabicSize: "1.75rem",
    translationSize: "1rem",
  },
  {
    id: "pure-white",
    name: "Pure Light",
    premium: false,
    bgGradient: "linear-gradient(180deg, #FFFFFF 0%, #F8F6F0 100%)",
    arabicColor: "#1A1A2E",
    translationColor: "#333333",
    referenceColor: "#888888",
    ornamentColor: "#C9A84C",
    arabicSize: "1.75rem",
    translationSize: "1rem",
  },
  {
    id: "emerald-garden",
    name: "Emerald Garden",
    premium: false,
    bgGradient: "linear-gradient(135deg, #0D4D3A 0%, #1A6B4E 50%, #0D4D3A 100%)",
    arabicColor: "#E8D5A3",
    translationColor: "#D4E8D4",
    referenceColor: "#8BAF8B",
    ornamentColor: "#E8D5A3",
    arabicSize: "1.75rem",
    translationSize: "1rem",
  },
  {
    id: "desert-sand",
    name: "Desert Sand",
    premium: false,
    bgGradient: "linear-gradient(135deg, #D4A574 0%, #C4956A 50%, #B8865E 100%)",
    arabicColor: "#FFFFFF",
    translationColor: "#FFF8F0",
    referenceColor: "#E8D4C0",
    ornamentColor: "#FFFFFF",
    arabicSize: "1.75rem",
    translationSize: "1rem",
  },
  {
    id: "royal-purple",
    name: "Royal Purple",
    premium: true,
    bgGradient: "linear-gradient(135deg, #2D1B4E 0%, #4A2C6E 50%, #2D1B4E 100%)",
    arabicColor: "#E8D5A3",
    translationColor: "#D4C4E8",
    referenceColor: "#9B8AB5",
    ornamentColor: "#E8D5A3",
    arabicSize: "1.75rem",
    translationSize: "1rem",
  },
  {
    id: "ocean-deep",
    name: "Ocean Deep",
    premium: true,
    bgGradient: "linear-gradient(135deg, #0A2342 0%, #1B4965 50%, #0A2342 100%)",
    arabicColor: "#CAE9FF",
    translationColor: "#BFD7EA",
    referenceColor: "#7BA3C4",
    ornamentColor: "#CAE9FF",
    arabicSize: "1.75rem",
    translationSize: "1rem",
  },
  {
    id: "rose-dawn",
    name: "Rose Dawn",
    premium: true,
    bgGradient: "linear-gradient(135deg, #4A1942 0%, #7B2D5F 50%, #4A1942 100%)",
    arabicColor: "#FFD1DC",
    translationColor: "#F0C0CC",
    referenceColor: "#C49BAA",
    ornamentColor: "#FFD1DC",
    arabicSize: "1.75rem",
    translationSize: "1rem",
  },
  {
    id: "earth-tone",
    name: "Earth Tone",
    premium: true,
    bgGradient: "linear-gradient(135deg, #3E2723 0%, #5D4037 50%, #3E2723 100%)",
    arabicColor: "#FFCC80",
    translationColor: "#D7CCC8",
    referenceColor: "#A1887F",
    ornamentColor: "#FFCC80",
    arabicSize: "1.75rem",
    translationSize: "1rem",
  },
];

export const FREE_STYLES = CARD_STYLES.filter((s) => !s.premium);
export const PREMIUM_STYLES = CARD_STYLES.filter((s) => s.premium);
