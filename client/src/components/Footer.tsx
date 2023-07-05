const Footer = () => {
    const year: number = new Date().getFullYear()
    return (
        <footer>
            © {year}{" "}
            <a href="https://github.com/roseniv18" target="blank" rel="noreferrer">
                Rosen Ivanov
            </a>
        </footer>
    )
}

export default Footer
