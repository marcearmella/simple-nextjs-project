import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout({children}){
    return(
        <>
            <Header />

            <main className="max-w-2xl m-auto">
                {children}
            </main>

            <Footer />
        </>
    );
}