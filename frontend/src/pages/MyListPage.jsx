import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Sparkles } from "lucide-react";

const MyListPage = () => {
    return (
        <div style={{ background: '#141414', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 20px' }}>
                <div style={{ animation: 'bounce 2s infinite', marginBottom: '30px' }}>
                    <Sparkles size={80} color="#e50914" />
                </div>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '20px' }}>You found the Easter Egg! 🥚</h1>
                <p style={{ fontSize: '1.5rem', color: '#8c8c8c', maxWidth: '600px', lineHeight: '1.4' }}>
                    Your list is currently empty, but don't worry—the best stories are yet to be discovered. 
                    Go back to the homepage and start your cinematic journey!
                </p>
                <style>
                    {`
                        @keyframes bounce {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(-20px); }
                        }
                    `}
                </style>
            </main>
            <Footer />
        </div>
    );
};

export default MyListPage;