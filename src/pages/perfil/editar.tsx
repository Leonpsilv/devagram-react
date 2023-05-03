import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import WithAuthorization from "@/hoc/withAuthorization"
import AlternativeHeader from "../../components/alternativeHeader"
import UploadImage from "@/components/uploadImage"

import defaultAvatarImg from "../../../public/images/avatar.svg"
import clearImg from "../../../public/images/clear.svg"
import UserService from "@/services/UserService"
import { nameValidate } from "@/utils/validators"

const userService = new UserService()

const EditProfile = ({
    loggedUser
}: any) => {
    const [avatar, setAvatar] = useState<any>()
    const [inputAvatar, setInputAvatar] = useState<any>()
    const [nameInput, setNameInput] = useState('')
    const router = useRouter()

    useEffect(() => {
        if(!loggedUser) return

        setNameInput(loggedUser.name)
        setAvatar({
            preview : loggedUser.avatar
        })

    }, [loggedUser])

    async function updateProfile () {
        try {
            if(nameValidate(nameInput)){
                alert('Nome inválido! Precisa ter pelo menos 2 caracteres')
                return
            }

            const payload = new FormData()
            payload.append('name', nameInput)

            if(avatar && avatar['file']) {
                payload.append('file', avatar['file'])
            }

            await userService.updateProfile(payload)

            localStorage.setItem('name', nameInput)
            if(avatar?.file){
                localStorage.setItem('avatar', avatar.preview)
            }

            router.push('/perfil/eu')
        } catch (error: any) {
            console.log(error)
            alert('Erro ao editar perfil! ')
        }
    }
    
    function leftClickBtn () {
        router.push('/perfil/eu')
    }

    function rightClickBtn () {
    }

    function openFileSelector () {
        inputAvatar?.click()
    }

    return (
        <div className="editProfilePage desktopLarge">
            <div className="editProfilePageContent">
                <AlternativeHeader
                    tittle="Editar Perfil"
                    leftText="Cancelar"
                    leftOnClick={leftClickBtn}
                    rightIcon={'Concluir'}
                    rightOnClick={updateProfile}
                />

                <hr className='dividingBorder'/>

                <div className="avatarEdit">
                    <UploadImage 
                        setImage={setAvatar}
                        imagePreview={avatar?.preview || defaultAvatarImg.src}
                        whenSetReference={setInputAvatar}
                        imagePreviewClassName="avatar"
                    />

                    <span onClick={openFileSelector}>Alterar foto do perfil</span>
                </div>

                <hr className='dividingBorder'/>

                <div className="nameEdit">
                    <label>Nome</label>
                    <input
                        type="text"
                        value={nameInput}
                        onChange={(e: any) => setNameInput(e.target.value)}
                    />

                    <Image
                        src={clearImg}
                        alt="Limpar campo de nome"
                        width={16}
                        height={16}
                        onClick={() => setNameInput('')}
                    />
                </div>

                <hr className='dividingBorder'/>
            </div>
        </div>
    )
}

export default WithAuthorization(EditProfile)