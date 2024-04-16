import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { LiaChalkboardSolid } from "react-icons/lia";

const navItems = [
    {
        label: "Features",
        link: "#",
        children: [
            {
                label: "Todo list",
                link: "#",
                iconImage: <LuListTodo className='text-purple-500' />
            },
            {
                label: "Calendar",
                link: "#",
                iconImage: <FaCalendarAlt className='text-red-500' />
            },
            {
                label: "Reminders",
                link: "#",
                iconImage: <IoIosNotifications className='text-yellow-700' />
            },
            {
                label: "Planning",
                link: "#",
                iconImage: <LiaChalkboardSolid className='text-cyan-400' />
            }
        ]
    },
    {
        label: "Compnay",
        link: "#",
        children: [
            {
                label: "History",
                link: "#"
            },
            {
                label: "Our Team",
                link: "#"
            },
            {
                label: "Blog",
                link: "#"
            }
        ]
    },
    {
        label: "Careers",
        link: "#"
    },
    {
        label: "About",
        link: "#"
    }
];


const Nav = ({ className }) => {
    return (
        <nav className={`${className} items-center gap-4 transition-all`}>
            <ul className="flex items-center position-relative">
                {navItems.map((data, index) => (
                    <Link
                        passHref={true}
                        key={index}
                        href={data.link ?? '#'}
                        className="relative group px-2 py-3 transition-all"
                    >
                        <span className="flex cursor-pointer items-center gap-2 text-neutral-600 group-hover:text-black">
                            <span>{data.label}</span>
                            {data.children && (
                                <MdKeyboardArrowDown className='rotate-180 transition-all group-hover:rotate-0' />
                            )}
                        </span>
                        {/* Dropdown */}
                        {data.children && (
                            <div className="absolute right-0 top-10 hidden w-auto flex-col gap-1 rounded-lg bg-white py-3 shadow-md transition-all">
                                <ul>
                                    {data.children.map((ch, index) => (
                                        <Link
                                            key={index}
                                            href={ch.link ?? '#'}
                                            className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-600 hover:text-black"
                                        >
                                            {ch.iconImage && (
                                                { ...ch.iconImage }
                                            )}
                                            <span className="whitespace-nowrap pl-3">{ch.label}</span>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </Link>
                ))}
            </ul>
        </nav>
    )
}

export default Nav