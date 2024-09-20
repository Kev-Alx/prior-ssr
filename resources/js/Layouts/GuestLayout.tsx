import priorLogo from "../../assets/prior logo.svg";
import ikomLogo from "../../assets/Logo ikom 1.svg";
import tiktok from "../../assets/TikTok.svg";
import youtube from "../../assets/Youtube.svg";
import { PropsWithChildren, useState } from "react";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import { ModeToggle } from "@/components/ModeToggle";
import { Link, router } from "@inertiajs/react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { z } from "zod";

const searchSchema = z
    .string()
    .min(1)
    .max(255)
    .trim()
    .regex(/^[a-zA-Z0-9\s]*$/);

export default function Guest({ children }: PropsWithChildren) {
    const [search, setSearch] = useState("");
    const handleSearch = (e: any) => {
        e.preventDefault();
        const result = searchSchema.safeParse(search);
        if (!result.success) {
            return;
        }
        router.get(`/search?s=${encodeURIComponent(search)}`);
    };

    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <div className="min-h-screen w-full bg-bg text-black selection:bg-[#9a958e] selection:text-neutral-50  dark:text-neutral-100 dark:bg-neutral-950">
                <nav className="bg-bg dark:shadow-neutral-400 shadow fixed top-0 w-full z-20 dark:bg-neutral-950">
                    <div className="max-w-7xl mx-auto py-3 max-sm:px-2 max-md:px-8 px-3 flex justify-between">
                        <Link
                            href="/"
                            className="flex gap-2 h-10 md:h-12 items-center "
                        >
                            <img
                                src={priorLogo}
                                alt="logo prior team"
                                className="h-8 sm:h-11 mix-blend-difference"
                            />
                            <img
                                src={ikomLogo}
                                alt="logo ikom"
                                className="h-8 sm:h-11 mix-blend-difference"
                            />
                        </Link>
                        <div className="flex items-center">
                            <div className="hidden sm:block">
                                <ModeToggle />
                            </div>
                            <form
                                className="flex items-center"
                                onSubmit={(e) => handleSearch(e)}
                            >
                                <Input
                                    placeholder="Search for an article"
                                    className="rounded-tr-none rounded-br-none ml-2 mr-1"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button className="max-sm:px-2 rounded-tl-none rounded-bl-none">
                                    <Search />
                                </Button>
                            </form>
                        </div>
                    </div>
                </nav>
                {children}
                <footer className="py-24 max-w-7xl gap-20 flex-col flex mx-auto px-4 xl:px-0">
                    <div className="flex justify-between">
                        <div className="flex gap-4 flex-col">
                            <h3 className="font-grotesk text-xl font-medium">
                                Contact
                            </h3>
                            <div className="flex flex-col gap-1">
                                <p>Universitas Kristen Petra</p>
                                <p>Surabaya, Indonesia</p>
                                <p className="font-medium">
                                    priorpcu@gmail.com
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-grotesk text-xl font-medium">
                                Follow us
                            </h3>
                            <div className="grid grid-cols-[1fr_3fr] items-center justify-center gap-x-2">
                                <a
                                    href="https://youtube.com/@priorpcu?si=UUmuB6J5G9liN1a1"
                                    target="_blank"
                                    className="font-grotesk hover:underline col-span-2 grid grid-cols-subgrid items-center"
                                >
                                    <img
                                        src={youtube}
                                        className="mix-blend-difference"
                                    />
                                    <span>Youtube</span>
                                </a>
                                <a
                                    href="https://www.tiktok.com/@prior.pcu?_t=8nydJxgfwrS&_r=1"
                                    target="_blank"
                                    className="font-grotesk hover:underline col-span-2 grid grid-cols-subgrid items-center"
                                >
                                    <img
                                        src={tiktok}
                                        className="mix-blend-difference"
                                    />
                                    <span>Tik Tok</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="gap-8 flex flex-col">
                        <Separator className="bg-black" />
                        <div className="flex sm:gap-1 flex-col sm:flex-row justify-between gap-8">
                            <p>2024 Team Prior. All rights resereved.</p>
                            <div className="flex sm:flex-row gap-6">
                                <Link
                                    href="/faq"
                                    className="underline font-bold"
                                >
                                    F.A.Q
                                </Link>
                                <Link
                                    href="/privacy-policy"
                                    className="underline"
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </ThemeProvider>
    );
}
