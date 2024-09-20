import { Link, Head, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import Guest from "@/Layouts/GuestLayout";
import ArticleCard from "@/components/ArticleCard";
import { Article, Category, MainAd } from "@/types/admin";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import tiktok from "../../assets/TikTok.svg";
import youtube from "../../assets/Youtube.svg";

export default function Welcome({
    auth,
    categories,
    articles,
    main_article,
    ad,
}: PageProps<{
    categories: Category[];
    articles: Article[];
    main_article: any;
    ad: MainAd;
}>) {
    const [page, setPage] = useState(1);
    const totalPage = Math.ceil(articles.length / 3);
    return (
        <>
            <Head title="Home" />
            <Guest>
                <Link
                    href={`/${main_article.slug}`}
                    className="h-screen px-8 md:px-16 lg:px-24 py-20 sm:py-24 flex items-end"
                >
                    <div className="max-w-3xl flex flex-col gap-4 z-10">
                        <h1 className="font-grotesk text-4xl sm:text-5xl lg:text-6xl text-balance text-bg font-semibold">
                            {main_article.title}
                        </h1>
                        <p className="sm:text-lg md:text-xl text-bg">
                            {main_article.description}
                        </p>
                    </div>
                    <img
                        src={main_article.main_image}
                        className="inset-0 absolute object-cover h-full w-full"
                    />
                    <div className="pointer-events-none absolute bottom-0 right-0 left-0 bg-gradient-to-t h-4/6 from-slate-950/70 to-slate-950/0" />
                </Link>
                <div className="sticky top-16 md:top-18 bg-bg/70 dark:bg-neutral-950/70 gap-x-12 gap-y-3 flex justify-center flex-wrap backdrop-blur py-4 border-b border-tag dark:border-neutral-400">
                    {categories.map((cat) => (
                        <Link
                            className="font-grotesk font-medium sm:text-lg border-b hover:border-slate-950 border-transparent transition-colors"
                            href={`/category/${cat.name}`}
                            key={cat.uuid}
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>
                <main className="mx-auto max-w-7xl py-16 flex flex-col items-center">
                    <h1 className="text-center font-grotesk text-4xl font-medium">
                        New Articles
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-8 sm:p-4 w-full">
                        {articles
                            .slice(0, Math.min(articles.length, 3 * page))
                            .map((article) => (
                                <ArticleCard
                                    article={article}
                                    key={article.slug}
                                />
                            ))}
                    </div>
                    {totalPage !== page && (
                        <Button
                            onClick={() => setPage((p) => p + 1)}
                            className="flex gap-2 hover:underline justify-center group w-36"
                            variant={"secondary"}
                        >
                            <span>Load more</span>
                            <ArrowUpRight
                                className="group-hover:rotate-45 transition-transform"
                                strokeWidth={1}
                            />
                        </Button>
                    )}
                </main>
                <section className="bg-slate-100 dark:bg-slate-900 px-8 py-4 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-2 md:gap-4 lg:px-12">
                    <h1 className="text-xl font-grotesk font-semibold">
                        {ad.title}
                    </h1>
                    <img
                        src={ad.image}
                        className="mr-auto md:mx-auto object-cover flex-shrink"
                    />
                    <div className="flex flex-col md:text-start gap-2">
                        <p>{ad.description}</p>
                        {ad.link.startsWith("/") ? (
                            <Button
                                asChild
                                size={"sm"}
                                className="self-start rounded-sm"
                            >
                                <Link href={ad.link}>Visit Us!</Link>
                            </Button>
                        ) : (
                            <Button
                                asChild
                                size={"sm"}
                                className="self-start rounded-sm"
                            >
                                <a href={ad.link}>Visit Us!</a>
                            </Button>
                        )}
                    </div>
                </section>
                <section className=" px-8 py-4 mt-24 max-w-7xl mx-auto space-y-8">
                    <h1 className="font-grotesk font-bold text-4xl md:text-center">
                        About us
                    </h1>
                    <p className="text-pretty md:text-center">
                        Selamat datang di PriorBrief, Laboratorium Public
                        Relations PCU yang merupakan wadah bagi mahasiswa Ilmu
                        Komunikasi (IKOM) untuk mengembangkan kompetensi sebagai
                        praktisi PR. Di sini, kamu akan mendapatkan pengalaman
                        dan pengetauan belajar yang menarik, menantang, dan
                        berwawasan luas melalui berbagai program dan kegiatan
                        yang dirancang khusus untuk membantumu mencapai
                        tujuan tersebut.
                    </p>
                </section>
                <section className="px-8 py-4 mt-24 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col gap-6 max-w-2xl">
                        <h1 className="font-grotesk text-3xl font-bold">
                            Bikin Kertas Baru dari Sampah Bareng Faber-Castell
                            dan Ikom PCU (Rewrite the Future, CSR PCU 2024)
                        </h1>
                        <p>
                            Siapa bilang sampah gak berguna? Yuk, ikutan
                            seru-seruan bikin kertas baru dari sampah bareng
                            teman-teman SDN Jemursari Wonosari I! Bersama
                            Faber-Castell dan Strategic Communication PCU, kita
                            belajar cara untuk mendaur ulang kertas yang kreatif
                            dan menyenangkan. Stay tune terus untuk info-info
                            menarik tentang dunia komunikasi strategis
                            melalui channel ini ya!
                        </p>
                        <div className="flex gap-4">
                            <Button className="bg-rose-600 hover:bg-rose-500 text-neutral-100 ">
                                <a
                                    className="flex gap-2"
                                    target="_blank"
                                    href="https://youtube.com/@priorpcu?si=UUmuB6J5G9liN1a1"
                                >
                                    <img src={youtube} />
                                    <span>Youtube</span>
                                </a>
                            </Button>
                            <Button>
                                <a
                                    href="https://www.tiktok.com/@prior.pcu?_t=8nydJxgfwrS&_r=1"
                                    className="flex gap-2"
                                    target="_blank"
                                >
                                    <img
                                        src={tiktok}
                                        className="mix-blend-difference"
                                    />
                                    <span>TikTok</span>
                                </a>
                            </Button>
                        </div>
                    </div>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/BeNST_ZYwRo?si=fStK6DObcBQD6wf5"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full object-cover"
                    ></iframe>
                </section>
            </Guest>
        </>
    );
}
