type PagePlaceholderProps = {
  title: string;
  description: string;
};

function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="rounded-lg border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-slate-600">{description}</p>
    </section>
  );
}

export default PagePlaceholder;

