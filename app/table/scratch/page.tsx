'use client'

import '../style.css'
import {Box} from "@mui/material";
import {Input} from "@/components/input";
import {useTextInput} from "@/hooks/use-text-input";
import {tableUsers} from "@/data/data";
import {FetchTableUsersRequestType, TableUser} from "@/types/table";
import {useEffect, useState} from "react";

const isUseMockData = false

const fetchUsers = async (param: FetchTableUsersRequestType): Promise<Array<TableUser>> => {
    if (isUseMockData) {
        return tableUsers.filter(user => user.name.indexOf(param.name ?? '') > -1)
    } else {
        const response = await fetch('/api/table/users', {
            method: 'POST',
            body: JSON.stringify(param)
        })
        const {users} = await response.json()
        return users
    }
}

export default function TableScratch() {
    const [searchWord, setSearchWord] = useTextInput()
    const [tableUserData, setTableUserData] = useState<Array<TableUser>>([])

    useEffect(() => {
        (async () => {
            const newUsers = await fetchUsers({ name: null })
            setTableUserData(newUsers)
        })()
    }, [])

    return (
        <main>
            <Box m={2}>
                <form>
                    <Input label="名前" errors={searchWord.errors} onChange={(e) => setSearchWord(e.target.value)} />
                </form>
            </Box>
            <Box m={2}>
                <table>
                    <thead>
                    <tr>
                        <th>名前</th>
                        <th>所属</th>
                        <th>好きなもの</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tableUserData.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.department}</td>
                                <td>{user.favoriteThings}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </Box>
        </main>
    )
}