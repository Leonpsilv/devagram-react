import Image from "next/image";


export default function PublicInput({
    image,
    typeInput,
    placeHolder,
    value = "",
    showValidationMsg = false,
    validationMsg = "",
    whenValueChanges
} : {
    image: string,
    typeInput: string,
    placeHolder?: string,
    value?: string,
    showValidationMsg?: boolean,
    validationMsg?: string,
    whenValueChanges: any
}) {

    return (
      <>
        <div className={`publicInputContainer`}>
            <div className={`publicInput`}>
                <Image
                    src={image}
                    alt={"imagem do campo"}
                    className="publicInputIcon"
                    width={20}
                    height={20}          
                />

                <input
                    type={typeInput}
                    placeholder={placeHolder}
                    value={value}
                    onChange={whenValueChanges}
                />
            </div>

            {showValidationMsg && <p className="validationMsg">{validationMsg}</p>}
        </div>
      </>
    )
  }
  