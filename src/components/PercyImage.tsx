import {useState} from "react";
import Image from "next/image";

type PercyImageProps = {
    baseImage: string | null
    hoverImage: string | null
}

export const PercyImage = ({ baseImage, hoverImage }: PercyImageProps) => {
    const [image, setImage] = useState(baseImage)

    return <div
        onMouseEnter={() => setImage(hoverImage)}
        onMouseLeave={() => setImage(baseImage)}
    >
        {image !== null ? <Image
            src={image} alt="Image cannot display" width={700} height={400}

        /> : <div className="w-[700px] h-[434px] flex justify-center items-center text-center">Cannot display image.<br/>Perhaps it&apos;s a new snapshot?</div>}
    </div>
}
