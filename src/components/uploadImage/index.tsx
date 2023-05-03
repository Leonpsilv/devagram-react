import { useEffect, useRef } from "react"

const UploadImage = ({
    className = '',
    setImage,
    imagePreview,
    imagePreviewClassName = '',
    whenSetReference
}: {
    className?: string
    setImage: any
    imagePreview?: string
    imagePreviewClassName?: string
    whenSetReference?: any
}) => {
    const inputReference = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(!whenSetReference) return

        whenSetReference(inputReference.current)
    }, [inputReference?.current])

    function getImageUrlAndSetState (file: File) {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onloadend = () => {
            setImage({
                preview: fileReader.result,
                file
            })
        }
    }

    function openFileSelector () {
        if(inputReference === null) return

        inputReference?.current?.click();
    }

    function whenImageChanges () {
        if (!inputReference.current?.files?.length)
            return

        const file = inputReference!.current!.files![0]
        getImageUrlAndSetState(file)
    }

    function whenDropImage (e: any) {
        e.preventDefault()
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0]
            getImageUrlAndSetState(file)
        }
    }

    return (
        <div
            className={`uploadImageContainer ${className}`}
            onClick={openFileSelector}
            onDragOver={(e: any) => e.preventDefault()}
            onDrop={whenDropImage}
        >
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