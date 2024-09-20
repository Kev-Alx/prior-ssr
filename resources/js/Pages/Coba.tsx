import { Head, router } from "@inertiajs/react";
export default function Coba() {
    const submitFile = async () => {
        try {
            const fileInput = document.querySelector('input[name="file"]');
            //@ts-ignore
            const selectedFile = fileInput?.files[0]; // Mendapatkan file yang dipilih oleh pengguna
            console.log(selectedFile);
            // router.post("/admin/upload", {
            //     file: selectedFile,
            // }); // Mengirim file ke endpoint upload di server

            // Selanjutnya, Anda dapat mengirimkan file ini melalui permintaan HTTP menggunakan Axios atau metode lain.
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type="file" name="file" />
            <button onClick={submitFile}>Submit</button>
        </div>
    );
}
