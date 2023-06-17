import {useState} from "react";
import Image from "next/image";

type PercyImageProps = {
    baseImage: string,
    hoverImage: string
}

export const PercyImage = ({ baseImage, hoverImage }: PercyImageProps) => {
    const [image, setImage] = useState(baseImage)

    return <Image
        src={image} alt="" width={700} height={700}
        onMouseEnter={() => setImage(hoverImage)}
        onMouseLeave={() => setImage(baseImage)}
    />
}
