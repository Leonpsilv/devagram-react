import Avatar from "@/components/avatar";
import Button from "@/components/Button";
import UploadImage from "@/components/uploadImage";
import { useRef, useState } from "react";

export default function Home() {
  const [image, setImage] = useState<any>()
  const inputReference = useRef<(() => void) | null>(null);

  return (
    <>
      <h1> Olá mundo </h1>
      <Button
        text="botao"
        onClick={() => console.log('clicou')}
        type='button'
        disabled={false}
        color='primary'
      />
      <Avatar src={undefined} />
      <UploadImage className="" setImage={setImage} imagePreview={image?.preview} imagePreviewClassName='' whenSetReference={(ref: any) => inputReference.current = ref}/>
    </>
  )
}
