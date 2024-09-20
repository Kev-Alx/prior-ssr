import ArticleCard from "@/components/ArticleCard";
import Guest from "@/Layouts/GuestLayout";
import { Article } from "@/types/admin";
import { Head, Link, usePage } from "@inertiajs/react";

type Props = {};

const Category = ({
    articles,
    main_article,
    cat,
}: {
    articles: Article[];
    main_article?: Article;
    cat: string;
}) => {
    return (
        <>
            <Head title="Welcome" />
            <Guest>
                <header className="pt-24 pb-12 md:pb-20 max-w-6xl mx-auto">
                    <h1 className="text-center font-grotesk font-semibold text-6xl">
                        {cat}
                    </h1>
                </header>
                {(main_article || articles.length > 0) && (
                    <Link
                        href={`/${main_article?.slug || articles[0]?.slug}`}
                        className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 lg:items-center gap-4 lg:gap-16 cursor-pointer"
                    >
                        <img
                            src={
                                main_article?.main_image ||
                                articles[0].main_image
                            }
                            className="lg:max-w-2xl w-full object-cover rounded flex-shrink"
                        />
                        <div className="lg:text-center flex flex-col justify-center w-full">
                            <h1 className="font-grotesk text-4xl sm:text-5xl lg:text-6xl text-balance ">
                                {main_article?.title || articles[0]?.title}
                            </h1>
                            <p className="sm:text-lg md:text-xl ">
                                {main_article?.description ||
                                    articles[0]?.description}
                            </p>
                            <p className="text-muted-foreground">
                                by {main_article?.author || articles[0]?.author}
                            </p>
                        </div>
                    </Link>
                )}
                {articles.length > 0 ? (
                    <main className="mx-auto max-w-7xl py-16 flex flex-col items-center">
                        <h1 className="text-center font-grotesk text-4xl font-medium">
                            Top articles
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-8 sm:p-4 w-full">
                            {!main_article && articles.length > 0
                                ? articles
                                      .slice(1)
                                      .map((article) => (
                                          <ArticleCard
                                              article={article}
                                              key={article.slug}
                                          />
                                      ))
                                : articles.map((article) => (
                                      <ArticleCard
                                          article={article}
                                          key={article.slug}
                                      />
                                  ))}
                        </div>
                    </main>
                ) : (
                    <h2 className="text-center text-muted-foreground">
                        No articles found.
                    </h2>
                )}
            </Guest>
        </>
    );
};

export default Category;
