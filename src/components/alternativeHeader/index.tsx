import Image from "next/image"

const AlternativeHeader = ({
    className = '',
    leftIcon,
    leftText,
    leftOnClick,
    rightIcon,
    rightOnClick,
    tittle
}: {
    className?: string,
    leftIcon?: any,
    leftText?: string,
    leftOnClick?: any,
    rightIcon?: any,
    rightOnClick?: any,
    tittle?: string
}) => {
   return (
    <div className={`alternativeHeader ${className}`}>
        {leftIcon ? (
            <Image
                src={leftIcon}
                alt="icone esquerda"
                onClick={leftOnClick}
                width={15}
                height={15}
            />
        ) : (
            leftText !== null && (
                <span
                    className="alternativeHeaderLeftText"
                    onClick={leftOnClick}
                >
                    {leftText}
                </span>
            )
        )}

        <h3>{tittle}</h3>

        {rightIcon && (
            <button
                type='button'
                className='rightActionBtn'
                onClick={rightOnClick}
            >
                {rightIcon}
            </button>
        )}
    </div>
   )
}

export default AlternativeHeader