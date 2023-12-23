import { Inter, Merriweather } from "next/font/google";

/**
 * The {@link Inter} font is used for all text on the site.
 */
export const FontSans = Inter({ subsets: ["latin"] });

/**
 * The {@link Merriweather} font is used for all serif text on the site.
 */
export const FontSerif = Merriweather({ subsets: ["latin"], weight: ["300", "400", "700", "900"] });
