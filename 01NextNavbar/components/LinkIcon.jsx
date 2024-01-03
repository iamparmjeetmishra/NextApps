import Link from "next/link";

const LinkIcon = ({ href, text, Icon }) => {
    return (
        <Link
            href={href}
            className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-600 hover:text-black"
        >
            {Icon}
            <span className="whitespace-nowrap pl-3">{text}</span>
        </Link>
    )
}

export default LinkIcon