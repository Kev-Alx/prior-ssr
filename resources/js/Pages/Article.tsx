import { Separator } from "@/components/ui/separator";
import Guest from "@/Layouts/GuestLayout";
import { formatDate } from "@/lib/utils";
import { Article } from "@/types/admin";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import { Head } from "@inertiajs/react";
import { ArrowUpRight, ChevronRight, Dot, Link } from "lucide-react";
import "@blocknote/react/style.css";
import { useBlockTheme } from "@/lib/store";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
type Props = {
    article: Article;
    related: Article[];
};
const ArticlePage = ({ article, related }: Props) => {
    const editor = useCreateBlockNote({
        // uploadFile: ()=>{}
        initialContent: article ? JSON.parse(article?.content || "") : null,
    });
    const { theme } = useBlockTheme();
    const [page, setPage] = useState(1);
    const totalPage = Math.ceil(related.length / 3);
    const onCopy = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() =>
            toast({
                title: "URL copied to clipboard",
                duration: 800,
            })
        );
    };

    return (
        <>
            <Head title={article.title} />
            <Guest>
                <main className="bg-bg dark:bg-neutral-950 max-w-7xl mx-auto px-8">
                    <header className="py-32 max-sm:pb-6 max-md:pb-16 space-y-8 md:space-y-16">
                        <section className="flex flex-col gap-6 max-w-5xl mx-auto">
                            <div className="flex gap-2 items-center">
                                <span className="font-grotesk">Blog</span>
                                <ChevronRight strokeWidth={1.4} />
                                <span className="font-grotesk font-semibold">
                                    {article.category.name}
                                </span>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <h1 className="font-grotesk font-bold text-3xl sm:text-5xl">
                                    {article.title}
                                </h1>
                                <div className="flex flex-row md:flex-col">
                                    <p className="font-grotesk font-semibold ">
                                        {article.author}
                                    </p>
                                    <Dot className="block md:hidden" />
                                    <div className="flex gap-1 ">
                                        <span className="font-grotesk">
                                            {formatDate(article.publish_date)}
                                        </span>
                                        <Dot />
                                        <span className="font-grotesk">
                                            {article.read_time} min read
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <img
                            className="bg-tag aspect-video w-full max-h-[32rem]"
                            src={article.main_image}
                        />
                    </header>
                    <BlockNoteView
                        editor={editor}
                        editable={false}
                        theme={theme}
                        data-theming-css-variables-demo
                        className="mb-16 max-w-5xl mx-auto"
                    />
                    <div className="flex justify-between mb-12">
                        <p
                            className="flex gap-2 items-center cursor-pointer"
                            onClick={onCopy}
                        >
                            <span className="font-grotesk font-semibold text-lg">
                                Share this post
                            </span>
                            <Link
                                strokeWidth={2.4}
                                className="p-1.5 bg-tag/70 dark:bg-neutral-50 rounded-full w-7 h-7 dark:stroke-neutral-950"
                            />
                        </p>
                        <span className="text-sm font-grotesk font-medium bg-tag/70 dark:bg-neutral-50 dark:text-neutral-950 px-2 py-1 rounded-lg">
                            {article.category.name}
                        </span>
                    </div>
                    <Separator />
                    {related.length > 0 && (
                        <section className="py-20">
                            <h2 className="font-bold font-grotesk text-3xl sm:text-5xl text-center mb-5">
                                Related posts
                            </h2>
                            <p className="sm:text-lg text-center text-muted-foreground">
                                Find more relevant content you'll enjoy
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:p-4 w-full">
                                {related
                                    .slice(
                                        0,
                                        Math.min(related.length, 3 * page)
                                    )
                                    .map((article) => (
                                        <ArticleCard
                                            article={article}
                                            key={article.slug}
                                        />
                                    ))}
                                {totalPage !== page && (
                                    <Button
                                        onClick={() => setPage((p) => p + 1)}
                                        className="flex gap-2 hover:underline justify-center group w-36"
                                    >
                                        <span>Load more</span>
                                        <ArrowUpRight
                                            className="group-hover:rotate-45 transition-transform"
                                            strokeWidth={1}
                                        />
                                    </Button>
                                )}
                            </div>
                        </section>
                    )}
                </main>
                <Toaster />
            </Guest>
        </>
    );
};

export default ArticlePage;
