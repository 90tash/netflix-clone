import './footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="inside-footer-block">
                <div className="credit-block">
                    <p>© 2025 Nishant Kumar. All rights reserved.</p>
                    <p>
                        Designed and Developed by
                        <a href="https://portfolio-ten-green-45.vercel.app/" target="_blank" rel="noopener noreferrer">Nishant Kumar</a>.
                    </p>

                </div>
                <div className="disclaimer-block">

                    <p>
                        <a href="" target="_blank">Disclaimer</a>: This website is for educational purposes only.
                    </p>
                    <p>
                        Follow me on:
                        <a href="https://www.linkedin.com/in/nishant-singh-4543a033b/" target="_blank" rel="noopener noreferrer"><img src="https://img.icons8.com/?size=100&id=8808&format=png&color=000000" alt="" />LinkedIn</a>,
                        <a href="https://github.com/consoledotlognishant" target="_blank" rel="noopener noreferrer"><img src="https://img.icons8.com/?size=100&id=12599&format=png&color=000000" alt="" />GitHub</a>,

                    </p>
                </div>

            </div>
        </footer>
    )
}

export default Footer;