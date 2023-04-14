import Navigation from "./Navigation"


const Footer = ({
    className
}: {
    className?: string
}) => {

    return (
        <footer className='footer mobile'>
            <Navigation />
        </footer>
    )
}

export default Footer