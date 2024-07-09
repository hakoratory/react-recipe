'use client'

import '../style.css'
import {Box, Button} from "@mui/material";
import {Input} from "@/components/input";
import {useTextInput} from "@/hooks/use-text-input";
import {tableUsers} from "@/data/data";
import {FetchTableUsersWithPageRequestType, TableUser} from "@/types/table";
import {useEffect, useState} from "react";

const fetchUsers = async (param: FetchTableUsersWithPageRequestType): Promise<Array<TableUser>> => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        return tableUsers.filter(user => user.name.indexOf(param.name ?? '') > -1)
    } else {
        const response = await fetch('/api/table/users-with-page', {
            method: 'POST',
            body: JSON.stringify(param)
        })
        const {users} = await response.json()
        return users
    }
}

export default function TableScratchWithPager() {
    const [searchWord, setSearchWord] = useTextInput()
    const [tableUserData, setTableUserData] = useState<Array<TableUser>>([])

    useEffect(() => {
        (async () => {
            const newUsers = await fetchUsers({ name: null, page: 1, pageSize: 2 })
            setTableUserData(newUsers)
        })()
    }, [])

    const handleClick = async () => {
        const newUsers = await fetchUsers({ name: searchWord.value, page: 1, pageSize: 2 })
        setTableUserData(newUsers)
    }

    return (
        <main>
            <Box m={2}>
                <Box display="flex">
                    <Box>
                        <Input label="名前" errors={searchWord.errors} onChange={(e) => setSearchWord(e.target.value)} />
                    </Box>
                    <Box ml={3} pt={3}>
                        <Button
                            type="button"
                            variant="contained"
                            disabled={searchWord.errors.length > 0}
                            onClick={handleClick}
                        >
                            検索
                        </Button>
                    </Box>
                </Box>
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
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
                    <div style={{border: '1px solid #000', width: '30px', textAlign: 'center'}}>{'<'}</div>
                    <div style={{border: '1px solid #000', width: '30px', textAlign: 'center', marginLeft: '8px'}}>1</div>
                    <div style={{border: '1px solid #000', width: '30px', textAlign: 'center', marginLeft: '8px'}}>2</div>
                    <div style={{border: '1px solid #000', width: '30px', textAlign: 'center', marginLeft: '8px'}}>{'>'}</div>
                </div>
            </Box>
        </main>
    )
}