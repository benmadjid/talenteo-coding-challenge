import { useEffect, useState } from "react"
import { useEmployeeStore } from "../store/use-employee-store"
import { IconSearch } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/useDebounce"
import { useShallow } from "zustand/shallow"

export const EmployeesSearch = () => {
    const [, setSearchInput] = useEmployeeStore(useShallow((s) => [s.filters.search, s.setFilters]))
    const [search, setSearch] = useState<string | undefined>()
    const debouncedSearch = useDebounce(search, 500)
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)

    }
    useEffect(() => {
        setSearchInput({ search: debouncedSearch })
    }, [debouncedSearch])
    return (

        <div className="relative w-full max-w-sm">
            <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search employees..."
                value={search}
                onChange={handleSearch}
                className="pl-9"
            />
        </div>
    )
}