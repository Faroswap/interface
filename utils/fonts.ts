import { Manrope } from "next/font/google";

export const manropeFont = Manrope({
  // weight: ['500', '600'],
  // If loading a variable font, you don't need to specify the font weight
  // weight: 'variable',
  subsets: ["latin"],
  display: "auto",
  fallback: ["PingFangSC-Regular", '"Microsoft YaHei"', "sans-serif"],
});
