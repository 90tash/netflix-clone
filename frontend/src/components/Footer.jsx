import "./footer.css";

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
                    Designed and Developed by Ashish Kumar Patra.{" "}
                    <a href="https://github.com/90tash" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                </p>
                <p className="footer-note">This website is for educational purposes only.</p>
            </div>
        </footer>
    );
};

export default Footer;
