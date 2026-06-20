export type LegalArticleProps = {
  id: string;
  title: string;
  content: string | string[];
};

export default function LegalArticle({
  id,
  title,
  content,
}: LegalArticleProps) {
  const isList = Array.isArray(content);

  return (
    <article aria-labelledby={id} className="space-y-2">
      <h2 id={id} className="text-lg font-semibold text-slate-700">
        {title}
      </h2>
      {isList ? (
        <ul className="list-disc pl-6 text-slate-500 space-y-1">
          {(content as string[]).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500">{content}</p>
      )}
    </article>
  );
}
