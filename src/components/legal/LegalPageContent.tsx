import LegalArticle, { LegalArticleProps } from './LegalArticle';

type LegalPageContentProps = {
  id: string;
  heading: string;
  description: string;
  articles: LegalArticleProps[];
};

export default function LegalPageContent({
  id,
  heading,
  description,
  articles,
}: LegalPageContentProps) {
  return (
    <section aria-labelledby={id} className="space-y-8">
      <h1 id={id} className="text-2xl font-bold text-slate-700 mb-4">
        {heading}
      </h1>
      <p className="text-slate-500 mb-6">{description}</p>
      {articles.map((article) => (
        <LegalArticle
          key={article.id}
          id={article.id}
          title={article.title}
          content={article.content}
        />
      ))}
    </section>
  );
}
