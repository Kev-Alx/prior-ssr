import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Head, router } from "@inertiajs/react";

export default function Login() {
    // const [email, setEmail] = useState('');

    const handleSession = async (email: any) => {
        try {
            router.post("/admin/session", { email: email });
        } catch (error) {
            console.log("error");
        }
    };

    return (
        <div>
            <Head title="Admin Login" />
            <div>
                <div className="h-full">
                    <h2 className="flex font-bold text-7xl justify-center items-center w-full h-full mb-10 mt-40 bg-gradient-to-r from-blue-100 to-black text-transparent bg-clip-text pb-10">
                        Admin Login
                    </h2>
                    <div className="flex justify-center items-center 96">
                        <GoogleOAuthProvider clientId="682490005599-m3hj1sjh8pikio9m9rb4jh8vgh7o9u18.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={(credentialResponse) => {
                                    const token = credentialResponse.credential;
                                    if (typeof token === "string") {
                                        // Konversi token menjadi string (tidak perlu dalam kebanyakan kasus)
                                        const tokenString = token.toString();
                                        // Lakukan sesuatu dengan tokenString
                                        var decoded = jwtDecode(tokenString);
                                        //@ts-ignore
                                        handleSession(decoded.email);
                                    } else {
                                        console.error("Token is not valid");
                                    }
                                }}
                                onError={() => console.log("error")}
                            />
                        </GoogleOAuthProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}
