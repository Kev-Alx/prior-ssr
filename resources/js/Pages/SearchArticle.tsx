import ArticleCard from "@/components/ArticleCard";
import Guest from "@/Layouts/GuestLayout";
import { Article } from "@/types/admin";
import { Head, Link, usePage } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

const SearchArticle = ({ articles }: { articles: Article[] }) => {
    const { url } = usePage();
    const searchTerm = url.split("?s=")[1];
    return (
        <>
            <Head title="Search Article" />
            <Guest>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-20 max-w-6xl mx-auto">
                    {articles.length < 1 ? (
                        <div className="col-span-3 p-24 flex flex-col gap-2">
                            <h1 className="font-grotesk text-5xl font-medium w-full text-center">
                                Article not found.
                            </h1>
                            <p className="text-muted-foreground text-center text-lg">
                                We can't find the term "{searchTerm}" in any of
                                our articles.
                            </p>
                            <Link
                                href="/"
                                className="text-center mt-4 px-4 py-1.5 bg-tag/70 w-fit mx-auto flex gap-2 rounded-md group hover:bg-tag transition-colors"
                            >
                                <ArrowLeft
                                    strokeWidth={1}
                                    className="group-hover:-translate-x-1 transition-transform"
                                />
                                <span>Back to homepage</span>
                            </Link>
                        </div>
                    ) : (
                        articles.map((article) => (
                            <ArticleCard article={article} key={article.uuid} />
                        ))
                    )}
                </div>
            </Guest>
        </>
    );
};

export default SearchArticle;
