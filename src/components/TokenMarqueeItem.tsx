import classNames from "classnames";

type TokenMarqueeItemProps = {
  name: string;
  content: string | number;
  positive?: boolean;
  negative?: boolean;
};

const TokenMarqueeItem = ({
  name,
  content,
  positive,
  negative,
}: TokenMarqueeItemProps) => {
  return (
    <span className="mx-12 marquee-font">
      <span>{name}:</span>{" "}
      <span
        className={classNames({
          "text-red-500": negative,
          "text-green-500": positive,
        })}
      >
        {content}
      </span>
    </span>
  );
};

export default TokenMarqueeItem;
