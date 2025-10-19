const TypingAnimationEllipsis = () => (
  <div className="max-w-auto mr-8 flex space-x-1 whitespace-pre-wrap rounded-md rounded-bl-none bg-border/60 px-2 py-1.5">
    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
  </div>
);

export default TypingAnimationEllipsis;
