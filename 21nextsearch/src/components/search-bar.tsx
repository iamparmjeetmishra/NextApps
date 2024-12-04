"use client"
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";



export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isSearching, startTransition] = useTransition()
  const [query, setQuery] = useState<string>('')
  const router = useRouter()
  
  const keydownFunction = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      inputRef?.current?.blur()
    }
    if (e.key === "Enter") {
      SearchHandler()
    }
  }
  
  const SearchHandler = () => {

    const route = `/search?query=${query}`

    startTransition(() => {
      router.push(route)
    })
  }

  return (
    <div className="relative w-full h-14 flex flex-col bg-white">
      <div className="relative h-14 z-10 rounded-md">
        <Input
          disabled={isSearching}
          ref={inputRef}
          onKeyDown={keydownFunction}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="absolute inset-0 h-full"
          placeholder="search here"
        />
        <Button className="absolute right-0 inset-y-0 h-full rounded-1-none" onClick={SearchHandler} disabled={isSearching} >
          <Search className="size-6" />
        </Button>
      </div>
    </div>
  )
}
