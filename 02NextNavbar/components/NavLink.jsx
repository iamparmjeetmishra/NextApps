import Link from "next/link";

const NavLink = ({ Lihref, Litext, LiDropDown, LiIcon }) => {

    return (
        <Link href={Lihref} className="relative group px-2 py-3 transition-all">
            <span className="flex cursor-pointer items-center gap-2 text-neutral-600 group-hover:text-black">
                <span>{Litext}</span>
                {LiIcon}
            </span>
            {/* Dropdown */}
            {LiDropDown}
        </Link>
    )
}

export default NavLink