import "./footer.css";
import { Github, Linkedin } from "lucide-react";

const footerLinks = [
    "FAQ",
    "Help Centre",
    "Account",
    "Media Centre",
    "Investor Relations",
    "Jobs",
    "Ways to Watch",
    "Terms of Use",
    "Privacy",
    "Cookie Preferences",
    "Corporate Information",
    "Contact Us",
    "Speed Test",
    "Legal Notices",
    "Only on Netflix",
];

const Footer = () => {
    return (
        <footer className="footer">
            <div className="inside-footer-block">
                <div className="footer-socials">
                    <span>Follow me on:</span>
                    <a href="https://github.com/90tash" target="_blank" rel="noopener noreferrer">
                        <Github size={18} /> GitHub
                    </a>
                    <a href="https://linkedin.com/in/ashish-kumar-patra-2b4207315/" target="_blank" rel="noopener noreferrer">
                        <Linkedin size={18} /> LinkedIn
                    </a>
                </div>

                <p className="footer-call">Questions? Call 000-800-919-1743</p>

                <div className="footer-links">
                    {footerLinks.map((link) => (
                        <a href="#" key={link}>
                            {link}
                        </a>
                    ))}
                </div>

                <select className="footer-language" aria-label="Select language">
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                </select>

                <p className="footer-brand">Netflix India</p>
                <p className="footer-credit">© 2025 Ashish Kumar Patra. All rights reserved.</p>
                <p className="footer-credit">
                    Designed and Developed by Ashish Kumar Patra.
                </p>
                <p className="footer-note">This website is for educational purposes only.</p>
            </div>
        </footer>
    );
};

export default Footer;
