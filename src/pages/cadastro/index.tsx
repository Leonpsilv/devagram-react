import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import envelopeImg from '../../../public/images/envelope.svg';
import keyImg from '../../../public/images/key.svg';
import logoImg from '../../../public/images/logo.svg';
import userImg from '../../../public/images/activeUser.svg';
import avatarImg from '../../../public/images/avatar.svg';

import PublicInput from '@/components/publicInput';
import Button from '@/components/button';
import UploadImage from "@/components/uploadImage";


export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(null)
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    return (
      <>
        <section className={`registerPage publicPage`}>
            <div className={`containerLogo desktop`}>
                <Image
                    src={logoImg}
                    alt={"Logo do devagram"}
                    fill
                    className="logo"        
                />
            </div>

            <div className={`publicPageContent`}>
                <form>
                    <UploadImage
                        setImage={setImage}
                        whenSetReference={undefined}
                        imagePreview={image?.['preview'] || avatarImg.src}
                        imagePreviewClassName="avatar avatarPreview"
                    />

                    <PublicInput
                        image={userImg}
                        typeInput={'text'}
                        placeHolder={'Digite seu nome'}
                        validationMsg={""}
                        value={name}
                        whenValueChanges={(e: any) => {setName(e.target?.value)}}
                    />

                    <PublicInput
                        image={envelopeImg}
                        typeInput={'email'}
                        placeHolder={'Digite seu email'}
                        validationMsg={""}
                        value={email}
                        whenValueChanges={(e: any) => {setEmail(e.target?.value)}}
                    />

                    <PublicInput
                        image={keyImg}
                        typeInput={'password'}
                        placeHolder={'Digite sua senha'}
                        validationMsg={""}
                        value={password}
                        whenValueChanges={(e: any) => {setPassword(e.target?.value)}}
                    />

                    <PublicInput
                        image={keyImg}
                        typeInput={'password'}
                        placeHolder={'Confirme sua senha'}
                        validationMsg={"As senhas estão diferentes!"}
                        value={passwordConfirm}
                        whenValueChanges={(e: any) => {setPasswordConfirm(e.target?.value)}}
                    />

                    <Button type={'submit'} text={"Cadastrar"} disabled={false} onClick={undefined} />
                </form>

                <div className="publicPageBaseboard">
                    <p>Já possui uma conta?</p>
                    <Link href={'/'}>Voltar para o Login.</Link>
                </div>
            </div>
        </section>
      </>
    )
  }
  