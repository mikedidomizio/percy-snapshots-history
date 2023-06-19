import {PercyImage} from "@/components/PercyImage";
import Link from "next/link";

type PercySnapshotCardProps = {
    branchName: string
    buildNumber: number
    buildUrl: string
    image: string
    imageOnHover: string
}

export const PercySnapshotCard = ({ buildNumber, buildUrl, branchName, image, imageOnHover }: PercySnapshotCardProps) => {
    return <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure className="bg-white">
            <Link href={buildUrl} target="_blank">
                <PercyImage hoverImage={imageOnHover} baseImage={image} />
            </Link>
        </figure>
        <div className="card-body">
            <h2 className="card-title">
                <Link href={buildUrl} target="_blank">{buildNumber}</Link>
            </h2>
            <p>{branchName}</p>
        </div>
    </div>
}
