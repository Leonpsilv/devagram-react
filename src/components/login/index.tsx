import PublicInput from "../publicInput";
import envelopeImg from '../../../public/images/envelope.svg'
import keyImg from '../../../public/images/key.svg'
import logoImg from '../../../public/images/logo.svg'
import Image from "next/image";
import Button from "../button";
import Link from "next/link";
import { useState } from "react";


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
                <form>
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

                    <Button type={'submit'} text={"Login"} disabled={false} onClick={undefined} />
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
  