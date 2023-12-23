import { Inter, Merriweather, IBM_Plex_Mono } from "next/font/google";

/**
 * The {@link Inter} font is used for all text on the site.
 */
export const FontSans = Inter({ subsets: ["latin"] });

/**
 * The {@link Merriweather} font is used for all serif text on the site.
 */
export const FontSerif = Merriweather({ subsets: ["latin"], weight: ["300", "400", "700", "900"] });

/**
 * The {@link IBM_Plex_Mono | IBM Plex Mono} font is used to display code.
 */
export const FontMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });
