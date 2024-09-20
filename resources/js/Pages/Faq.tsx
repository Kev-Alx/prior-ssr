import { Head, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Faq as FaqT } from "@/types/admin";
import Guest from "@/Layouts/GuestLayout";
import { Separator } from "@/components/ui/separator";

export default function Faq({ faqs }: { faqs: FaqT[] }) {
    return (
        <>
            <Head title="FAQ" />
            <Guest>
                <div className="grid md:grid-cols-[1fr_2fr] gap-x-16 md:mt-20 max-w-7xl mx-auto p-8 pt-24">
                    <div className=" text-5xl font-bold md:border-r-slate-400 md:border-r">
                        FAQs
                        {/* <div className="text-xl font-normal mt-7 mb-4">
                            Frequently asked questions about us
                        </div> */}
                        <Separator className="md:hidden" />
                        {/* <div>
                            <Button
                                className="mt-5"
                                onClick={() => router.replace("/contact")}
                            >
                                Contact Us
                            </Button>
                        </div> */}
                    </div>

                    <div className="mt-16 md:mt-0 flex flex-col gap-8 text-3xl font-bold">
                        {faqs.map((faq, index) => (
                            <div key={index}>
                                <h3 className="mb-5">{faq.question}</h3>
                                <p className="text-xl font-normal">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </Guest>
        </>
    );
}
