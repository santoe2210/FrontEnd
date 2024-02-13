import ArticleTable from "@/components/Articles/ArticleTable";

export default async function Home() {
  return (
    <main>
      <div className="max-w-[1200px] mx-auto">
        <ArticleTable />
      </div>
    </main>
  );
}
