import Navigation from "./Navigation"

const Footer = ({
    loggedUser,
    className
}: {
    className?: string,
    loggedUser?: object
}) => {

    return (
        <footer className={`footer mobile ${className}`}>
            <Navigation />
        </footer>
    )
}

export default Footer