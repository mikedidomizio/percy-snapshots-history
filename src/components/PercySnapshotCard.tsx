import {PercyImage} from "@/components/PercyImage";
import Link from "next/link";

type PercySnapshotCardProps = {
    branchName: string
    buildNumber: number
    buildUrl: string
    image: string | null
    imageOnHover: string | null
}

export const PercySnapshotCard = ({ buildNumber, buildUrl, branchName, image, imageOnHover }: PercySnapshotCardProps) => {
    return <div className="card card-compact flex w-96 bg-base-100 shadow-xl">
        <figure className="bg-white">
            <Link href={buildUrl} target="_blank">
                <PercyImage hoverImage={imageOnHover} baseImage={image} />
            </Link>
        </figure>
        <div className="h-[120px] content-end p-4">
            <h2 className="card-title">
                <Link href={buildUrl} target="_blank">{buildNumber}</Link>
            </h2>
            <p>{branchName}</p>
        </div>
    </div>
}
