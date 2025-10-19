import {
  discordLogo,
  facebookLogo,
  instagramLogo,
  redditLogo,
  solLogo,
  telegramLogo,
  whatsappLogo,
  xLogo,
  youtubeLogo,
} from "@/assets/logos";

export const logoMap: Record<string, JSX.Element> = {
  Discord: (
    <img
      draggable={false}
      src={discordLogo}
      width={32}
      alt="Discord Logo"
      className="select-none"
    />
  ),
  Facebook: (
    <img
      draggable={false}
      src={facebookLogo}
      width={32}
      alt="Facebook Logo"
      className="select-none"
    />
  ),
  Instagram: (
    <img
      draggable={false}
      src={instagramLogo}
      width={32}
      alt="Instagram Logo"
      className="select-none"
    />
  ),
  Reddit: (
    <img
      draggable={false}
      src={redditLogo}
      width={32}
      alt="Reddit Logo"
      className="select-none"
    />
  ),
  Telegram: (
    <img
      draggable={false}
      src={telegramLogo}
      width={32}
      alt="Telegram Logo"
      className="select-none"
    />
  ),
  WhatsApp: (
    <img
      draggable={false}
      src={whatsappLogo}
      width={32}
      alt="WhatsApp Logo"
      className="select-none"
    />
  ),
  X: (
    <img
      draggable={false}
      src={xLogo}
      width={32}
      alt="X Logo"
      className="select-none"
    />
  ),
  YouTube: (
    <img
      draggable={false}
      src={youtubeLogo}
      width={32}
      alt="YouTube Logo"
      className="select-none"
    />
  ),
  Solana: (
    <img
      draggable={false}
      src={solLogo}
      width={32}
      alt="Sol Outline Logo"
      className="select-none"
    />
  ),
};