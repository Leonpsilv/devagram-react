import { useEffect, useRef } from "react"

const UploadImage = ({
    className = '',
    setImage,
    imagePreview,
    imagePreviewClassName = '',
    whenSetReference
}: {
    className: string | undefined
    setImage: any
    imagePreview: null | string
    imagePreviewClassName: string
    whenSetReference: any
}) => {
    const inputReference = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(!whenSetReference) return

        whenSetReference(inputReference.current)
    }, [inputReference?.current])

    function openFileSelector() {
        if(inputReference === null) return

        inputReference?.current?.click();
    }

    const whenImageChanges = () => {
        if (!inputReference.current?.files?.length) return

        const file = inputReference!.current!.files![0]

        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onloadend = () => {
            setImage({
                preview: fileReader.result,
                file
            })
        }
    }

    return (
        <div
            className={`uploadImageContainer ${className}`}
            onClick={openFileSelector}
        >
            <button>abrir seletor de arquivos</button>
            {imagePreview && (
                <div className="imagePreviewContainer">
                    <img 
                        src={imagePreview}
                        alt="image preview"
                        className={imagePreviewClassName}
                    />
                </div>
            )}
            <input
                type='file'
                className="hidden"
                accept="image/*"
                ref={inputReference}
                onChange={whenImageChanges}
            />
        </div>
    )
}

export default UploadImage