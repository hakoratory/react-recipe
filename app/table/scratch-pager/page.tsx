'use client'

import '../style.css'
import {Box, Button} from "@mui/material";
import {Input} from "@/components/input";
import {useTextInput} from "@/hooks/use-text-input";
import {tableUsers} from "@/data/data";
import {FetchTableUsersWithPageRequestType, FetchTableUsersWithPageResponseType, TableUser} from "@/types/table";
import {useEffect, useState} from "react";

const fetchUsers = async (param: FetchTableUsersWithPageRequestType): Promise<FetchTableUsersWithPageResponseType> => {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    return {
      users: tableUsers.filter(user => user.name.indexOf(param.name ?? '') > -1),
      totalCount: tableUsers.length,
    }
  } else {
    const response = await fetch('/api/table/users-with-page', {
      method: 'POST',
      body: JSON.stringify(param)
    })
    return await response.json()
  }
}

export default function TableScratchWithPager() {
  const [searchWord, setSearchWord] = useTextInput()
  const [tableUserData, setTableUserData] = useState<Array<TableUser>>([])
  const [totalCount, setTotalCount] = useState<number>(tableUserData.length)
  const [totalPageCount, setTotalPageCount] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    (async () => {
      const newUsers = await fetchUsers({name: null, page: 1, pageSize: 2})
      setTableUserData(newUsers.users)
      setTotalCount(newUsers.totalCount)
      setTotalPageCount(Math.ceil(newUsers.totalCount / 2))
      setCurrentPage(1)
    })()
  }, [])

  useEffect(() => {
    console.log('totalPageCount', totalPageCount)
  }, [totalPageCount]);

  const handleClick = async () => {
    const newUsers = await fetchUsers({name: searchWord.value, page: 1, pageSize: 2})
    setTableUserData(newUsers.users)
    setTotalCount(newUsers.totalCount)
    setTotalPageCount(Math.ceil(newUsers.totalCount / 2))
    setCurrentPage(1)
  }

  const handlePageChange = async (newPage: number) => {
    const newUsers = await fetchUsers({name: searchWord.value, page: newPage, pageSize: 2})
    setTableUserData(newUsers.users)
    setTotalCount(newUsers.totalCount)
    setTotalPageCount(Math.ceil(newUsers.totalCount / 2))
    setCurrentPage(newPage)
  }

  return (
    <main>
      <Box m={2}>
        <Box display="flex">
          <Box>
            <Input label="名前" errors={searchWord.errors} onChange={(e) => setSearchWord(e.target.value)}/>
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
          {
            // ２ページ以上のとき、「<」ボタンを表示する
            totalPageCount > 1 &&
            <div style={{border: '1px solid #000', width: '30px', textAlign: 'center'}}>{'<'}</div>
          }
          {
            [...Array(totalPageCount)].map((_, index) => (
              index + 1 === currentPage
                ? (
                  <div key={index}
                       style={{
                         border: '1px solid #000',
                         width: '30px',
                         textAlign: 'center',
                         marginLeft: '8px',
                         backgroundColor: '#d3d8d9'
                       }}
                  >
                    {index + 1}
                  </div>
                )
                : (
                  <div key={index}
                       style={{
                         border: '1px solid #000',
                         width: '30px',
                         textAlign: 'center',
                         marginLeft: '8px'
                       }}
                       onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </div>
                )
            ))
          }
          {
            // ２ページ以上のとき、「>」ボタンを表示する
            totalPageCount > 1 &&
            <div
              style={{
                border: '1px solid #000',
                width: '30px',
                textAlign: 'center',
                marginLeft: '8px'
              }}
            >
              {'>'}
            </div>
          }
        </div>
      </Box>
    </main>
  )
}