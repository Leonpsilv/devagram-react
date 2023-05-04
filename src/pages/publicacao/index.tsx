import { useState } from "react"
import AlternativeHeader from "@/components/alternativeHeader"
import UploadImage from "@/components/uploadImage"
import WithAuthorization from "@/hoc/withAuthorization"

import newPostImg from "../../../public/images/newPost.svg"
import leftArrowImg from "../../../public/images/leftArrow.svg"
import PrimaryOrInvertedBtn from "@/components/button"
import { useRouter } from "next/router"
import PostService from "@/services/PostService"

const postService = new PostService()

const NewPost = () => {
    const [image, setImage] = useState<any>()
    const [inputImage, setInputImage] = useState<any>()
    const [currentStep, setCurrentStep] = useState<any>(1)
    const [description, setDescription] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const isFirstStep = () => currentStep === 1
    const router = useRouter()
    

    function getLeftText () {
        if(isFirstStep() && image) return 'Cancelar'

        return ''
    }

    function getRightText () {
        if(!image) return ''

        if (isFirstStep()) return 'Avançar'

        return 'Compartilhar'
    }

    function onClickLeft () {
        if (isFirstStep()) {
            inputImage.value = null
            setImage(null)
            return
        }

        setCurrentStep(1)
    }

    function onClickRight () {
        if(submitting) return
        if(currentStep === 1) {
            setCurrentStep(2)
            return
        }
        postNewPost()
    }

    function getHeaderClassName () {
        if(isFirstStep()) {
            return 'firstStepHeader'
        }

        return 'secondStepHeader'
    }

    async function postNewPost () {
        try {
            if(!image || !description) return
            setSubmitting(true)
            
            const payload = new FormData()
            payload.append('file', image['file'])
            payload.append('description', description)

            await postService.newPost(payload)

            setSubmitting(false)
            return router.push('/')
        } catch (error) {
            setSubmitting(false)
            alert('Falha ao publicar postagem!')   
        }
    }

    return (
        <div className="postPage desktopLarge">
                <AlternativeHeader
                    className={getHeaderClassName()}
                    tittle="Nova publicação"
                    leftText={getLeftText()}
                    leftIcon={isFirstStep() ? null : leftArrowImg }
                    leftOnClick={onClickLeft}
                    rightIcon={getRightText()}
                    rightOnClick={onClickRight}
                />
            <hr className="dividingBorder"/>

            <div className="postContentPage">
                {isFirstStep() ? (
                <div className="firstStep">
                    <UploadImage 
                        setImage={setImage}
                        imagePreview={image?.preview || newPostImg.src}
                        whenSetReference={setInputImage}
                        imagePreviewClassName={!image ? 'postImagePreview' : 'postSelectedImagePreview'}
                    />

                    <span className="dragAndDropText desktop">Arraste sua foto para cá!</span>

                    <PrimaryOrInvertedBtn
                        text="Selecionar uma imagem"
                        onClick={() => inputImage?.click()}
                    />
                </div>

                ) : (
                    <>
                        <div className="secondStep">
                            <UploadImage 
                                setImage={setImage}
                                imagePreview={image?.preview}
                            />

                            <textarea
                                value={description}
                                rows={5}
                                placeholder="Escreva uma legenda"
                                onChange={(e: any) => setDescription(e.target.value)}
                            ></textarea>

                        </div>
                            <hr className="dividingBorder"/>
                    </>
                )}
            </div>

        </div>
    )
}

export default WithAuthorization(NewPost)