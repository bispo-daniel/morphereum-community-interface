import { Link } from "react-router-dom";

import { TextSectionAnimatedTitle, TextSectionAnimatedP } from ".";

interface LinkProps {
  content: string;
  path: string;
}

interface TextSectionProps {
  animatedTitle: {
    text: string;
    reverse?: boolean;
    tilted?: boolean;
  };
  paragraphs: string[];
  link: LinkProps;
}

const TextSection = ({ animatedTitle, paragraphs, link }: TextSectionProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <TextSectionAnimatedTitle
        text={animatedTitle.text}
        reverse={animatedTitle.reverse}
        tilted={animatedTitle.tilted}
      />

      <div className="gummy-big flex max-w-[1000px] flex-col items-center justify-center gap-2 text-center lg:gap-4">
        {paragraphs.map((p, index) => (
          <TextSectionAnimatedP key={index} phrase={p} />
        ))}
      </div>

      {link.content && link.path && (
        <p className="text-center gummy-big">
          <Link
            to={link.path}
            className="text-[var(--coin-purple)] transition-all hover:underline dark:text-[var(--coin-font)]"
          >
            <TextSectionAnimatedP phrase={link.content} />
          </Link>
        </p>
      )}
    </div>
  );
};

export default TextSection;
