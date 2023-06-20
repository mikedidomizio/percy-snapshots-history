import Link from "next/link";
import Image from "next/image";

const { homepage } = require('../../package.json');

export const Header = () => {
    return <div className="p-6">
            <div className="flex flex-row space-x-4 items-center">
                <h1>
                    <Link href="/">Percy Snapshots History</Link>
                </h1>
                <Link href={homepage} target="_blank">
                    <Image alt="link to github repo" src="/github-mark.svg" width={32} height={32} />
                </Link>

                <Link href="/settings">Settings</Link>
            </div>
        </div>
}
