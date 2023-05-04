import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import keyImg from '../../../public/images/key.svg'
import envelopeImg from '../../../public/images/envelope.svg'
import logoImg from '../../../public/images/logo.svg'

import PublicInput from "../publicInput";
import {emailValidate} from '../../utils/validators';
import UserService from "../../services/UserService";
import PrimaryOrInvertedBtn from "../button";

const userService = new UserService()

export default function Login({ afterAuthenticate } : {afterAuthenticate: any}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)

    function formValidate(){
        if(emailValidate(email) || !email || !password) return true

        return false
    }

    const whenSubmit = async (e: any) => {
        e.preventDefault()

        if(!email || !password) return  
        if(formValidate()) return
        setSubmitting(true)

        try {
            const payload = {
                login: email,
                password
            }

            await userService.login(payload)
            if(afterAuthenticate){
                afterAuthenticate()
            }

        } catch (e: any) {
            alert('Erro ao logar usuário. ' + e?.response?.data?.error)
        }
        setSubmitting(false)
    }

    return (
      <>
        <section className={`loginPage publicPage`}>
            <div className={`containerLogo`}>
                <Image
                    src={logoImg}
                    alt={"Logo do devagram"}
                    fill
                    className="logo"        
                />
            </div>

            <div className={`publicPageContent`}>
                <form onSubmit={whenSubmit}>
                    <PublicInput
                        image={envelopeImg}
                        typeInput={'email'}
                        placeHolder={'Digite seu email'}
                        validationMsg={"O email informado é inválido"}
                        showValidationMsg={emailValidate(email)}
                        value={email}
                        whenValueChanges={(e: any) => {setEmail(e.target?.value)}}
                    />

                    <PublicInput
                        image={keyImg}
                        typeInput={'password'}
                        placeHolder={'Digite sua senha'}
                        value={password}
                        whenValueChanges={(e: any) => {setPassword(e.target?.value)}}
                    />

                    <PrimaryOrInvertedBtn
                        type={'submit'}
                        text={"Login"}
                        disabled={formValidate() || submitting}
                        onClick={undefined}
                    />
                </form>

                <div className="publicPageBaseboard">
                    <p>Não possui uma conta?</p>
                    <Link href={'/cadastro'}>Faça seu cadastro agora.</Link>
                </div>
            </div>
        </section>
      </>
    )
  }
  