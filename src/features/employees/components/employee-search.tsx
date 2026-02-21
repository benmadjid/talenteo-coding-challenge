import { useEffect, useState } from "react"
import { useEmployeeStore } from "../store/useEmployeeStore"
import { IconSearch } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/useDebounce"
import { useShallow } from "zustand/shallow"

export const EmployeesSearch = () => {
    const [, setFilters] = useEmployeeStore(useShallow((s) => [s.filters.search, s.setFilters]))
    const [search, setSearch] = useState<string | undefined>()
    const debouncedSearch = useDebounce(search, 500)
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    useEffect(() => {
        setFilters({ search: debouncedSearch })
    }, [debouncedSearch, setFilters])
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