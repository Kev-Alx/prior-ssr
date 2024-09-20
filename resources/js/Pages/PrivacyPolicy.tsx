import { Head } from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout";
import { Separator } from "@/components/ui/separator";

export default function Faq() {
    return (
        <>
            <Head title="Privacy Policy" />
            <Guest>
                <main className="px-8 py-4 mt-24 max-w-7xl mx-auto space-y-6">
                    <h1 className="font-grotesk font-bold text-4xl">
                        Privacy Policy
                    </h1>
                    <Separator />
                    <p className="lg:max-w-4xl font-medium">
                        Kebijakan Privasi Prior Brief
                    </p>
                    <p>
                        Kami berkomitmen untuk melindungi privasi pengguna situs
                        web kami. Kebijakan Privasi ini menjelaskan bagaimana
                        kami mengumpulkan, menggunakan, dan mengungkapkan
                        informasi yang kami kumpulkan dari pengguna Situs.
                    </p>
                    <h3 className="font-medium text-lg">
                        Informasi yang Kami Kumpulkan
                    </h3>
                    <p>
                        Kami mengumpulkan informasi berikut dari pengguna Situs:
                    </p>
                    <ul>
                        <li className="list-disc">
                            <span className="font-medium">Informasi Log:</span>{" "}
                            Ketika Anda mengunjungi Situs, kami secara otomatis
                            mengumpulkan informasi log tertentu tentang
                            kunjungan Anda, termasuk alamat IP Anda, browser web
                            Anda, sistem operasi Anda, halaman yang Anda
                            kunjungi, waktu yang dihabiskan di setiap halaman,
                            dan informasi lainnya.
                        </li>
                        <li className="list-disc">
                            <span className="font-medium">
                                Informasi Perangkat:
                            </span>{" "}
                            Kami juga dapat mengumpulkan informasi tentang
                            perangkat Anda, seperti jenis perangkat, model
                            perangkat, sistem operasi perangkat, dan pengenal
                            perangkat unik.
                        </li>
                        <li className="list-disc">
                            <span className="font-medium">
                                Informasi Cookie:
                            </span>{" "}
                            Kami menggunakan cookie dan teknologi pelacakan
                            lainnya untuk mengumpulkan informasi tentang
                            penggunaan Anda atas Situs. Cookie adalah file teks
                            kecil yang disimpan di komputer Anda ketika Anda
                            mengunjungi situs web. Kami menggunakan cookie untuk
                            melacak aktivitas Anda di Situs, mengingat
                            preferensi Anda, dan untuk meningkatkan pengalaman
                            Anda secara keseluruhan. Anda dapat memilih untuk
                            menonaktifkan cookie di browser web Anda, tetapi
                            melakukan hal itu dapat membatasi fungsionalitas
                            Situs.
                        </li>
                    </ul>
                    <h3 className="font-medium text-lg">
                        Bagaimana Kami Menggunakan Informasi Anda
                    </h3>
                    <p>Kami menggunakan informasi yang kami kumpulkan untuk:</p>
                    <ul>
                        <li className="list-disc">
                            <span className="font-medium">
                                Meningkatkan Situs:
                            </span>{" "}
                            Kami menggunakan informasi yang kami kumpulkan untuk
                            meningkatkan Situs dan pengalaman pengguna.
                        </li>
                        <li className="list-disc">
                            <span className="font-medium">
                                Personalisasi Pengalaman:
                            </span>{" "}
                            Kami menggunakan informasi yang kami kumpulkan untuk
                            mempersonalisasi pengalaman Anda di Situs, seperti
                            dengan memberikan rekomendasi konten yang menurut
                            kami mungkin menarik bagi Anda.
                        </li>
                        <li className="list-disc">
                            <span className="font-medium">
                                Mengirim Komunikasi:
                            </span>{" "}
                            Kami menggunakan informasi yang kami kumpulkan untuk
                            mengirimi Anda komunikasi pemasaran dan promosi,
                            seperti buletin dan pemberitahuan.
                        </li>
                        <li className="list-disc">
                            <span className="font-medium">
                                Memenuhi Kewajiban Hukum:
                            </span>{" "}
                            Kami menggunakan informasi yang kami kumpulkan untuk
                            mematuhi kewajiban hukum kami.
                        </li>
                    </ul>
                    <h3 className="font-medium text-lg">
                        Pengungkapan Informasi Anda
                    </h3>
                    <p>
                        Kami tidak membagikan informasi pribadi Anda dengan
                        pihak ketiga kecuali dalam keadaan berikut:{" "}
                    </p>
                    <ul>
                        <li className="list-disc">
                            <span className="font-medium">
                                Dengan Persetujuan Anda:
                            </span>{" "}
                            Kami akan membagikan informasi Anda dengan pihak
                            ketiga dengan persetujuan Anda.
                        </li>
                        <li className="list-disc">
                            <span className="font-medium">
                                Untuk Penyedia Layanan:
                            </span>{" "}
                            Kami membagikan informasi Anda dengan penyedia
                            layanan pihak ketiga yang membantu kami
                            mengoperasikan Situs, seperti penyedia hosting web
                            dan penyedia layanan email. Penyedia layanan ini
                            hanya dapat menggunakan informasi Anda untuk
                            melakukan layanan yang kami berikan kepada mereka.
                        </li>
                        <li className="list-disc">
                            <span className="font-medium">
                                Untuk Melindungi Hak Kami:
                            </span>{" "}
                            Kami akan membagikan informasi Anda dengan pihak
                            ketiga untuk melindungi hak dan properti kami, atau
                            hak dan properti pihak ketiga lainnya.{" "}
                        </li>
                        <li className="list-disc">
                            <span className="font-medium">
                                Untuk Mematuhi Hukum:
                            </span>{" "}
                            Kami akan membagikan informasi Anda dengan pihak
                            ketiga jika diwajibkan oleh hukum, atau jika kami
                            yakin dengan itikad baik bahwa pengungkapan tersebut
                            diperlukan untuk mematuhi hukum atau proses hukum
                            yang disajikan pada kami atau Situs.
                        </li>
                    </ul>
                    <h3 className="font-medium text-lg">
                        Keamanan Informasi Anda
                    </h3>
                    <p>
                        Kami mengambil langkah-langkah keamanan yang wajar untuk
                        melindungi informasi pribadi Anda dari akses,
                        penggunaan, pengungkapan, pengubahan, atau perusakan
                        yang tidak sah. Namun, tidak ada metode keamanan yang
                        sempurna, dan kami tidak dapat menjamin keamanan
                        informasi pribadi Anda.{" "}
                    </p>
                    <h3 className="font-medium text-lg">Pilihan Anda </h3>
                    <p>
                        Anda memiliki pilihan berikut terkait dengan informasi
                        pribadi Anda:
                    </p>
                    <ul>
                        <li className="list-disc">
                            <span className="font-medium">
                                Akses dan Koreksi:
                            </span>{" "}
                            Anda dapat mengakses dan memperbarui informasi
                            pribadi Anda dengan menghubungi kami di [alamat
                            email].
                        </li>
                        <li className="list-disc">
                            <span className="font-medium">
                                Penonaktifan Cookie:
                            </span>{" "}
                            Anda dapat memilih untuk menonaktifkan cookie di
                            browser web Anda. Namun, melakukan hal itu dapat
                            membatasi fungsionalitas Situs.{" "}
                        </li>
                        <li className="list-disc">
                            <span className="font-medium">
                                Penghapusan Informasi:
                            </span>{" "}
                            Anda dapat meminta kami untuk menghapus informasi
                            pribadi Anda dengan menghubungi kami di
                            priorpcu@gmail.com. Kami akan menghapus informasi
                            pribadi Anda sesegera mungkin, sesuai dengan
                            kewajiban hukum kami.
                        </li>
                    </ul>
                    <h3 className="font-medium text-lg">
                        Perubahan pada Kebijakan Ini{" "}
                    </h3>
                    <p>
                        Kami dapat memperbarui Kebijakan ini dari waktu ke
                        waktu. Jika kami membuat perubahan material pada
                        Kebijakan ini, kami akan memberi tahu Anda dengan
                        memposting pemberitahuan di Situs atau dengan
                        mengirimkan email kepada Anda.{" "}
                    </p>
                    <h3 className="font-medium text-lg">Hubungi Kami </h3>
                    <p>
                        Jika Anda memiliki pertanyaan tentang Kebijakan ini,
                        silakan hubungi kami di priorpcu@gmail.com
                    </p>
                </main>
            </Guest>
        </>
    );
}
