'use client'

import '../style.css'
import {Box, Button} from "@mui/material";
import {Input} from "@/components/input";
import {useTextInput} from "@/hooks/use-text-input";
import {tableUsers} from "@/data/data";
import {
  FetchTableUsersWithPageRequestType,
  FetchTableUsersWithPageResponseType,
  PagerProps,
  TableUser
} from "@/types/table";
import {CSSProperties, useEffect, useState} from "react";

const fetchUsers = async (param: FetchTableUsersWithPageRequestType): Promise<FetchTableUsersWithPageResponseType> => {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
    const filteredUsers = tableUsers.filter(user => user.name.indexOf(param.name ?? '') > -1)
    const from = (param.page - 1) * param.pageSize
    const to = param.page * param.pageSize
    return {
      users: filteredUsers.slice(from, to),
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

const Pager = ({totalCount, page, pageSize, onPageChange}: PagerProps) => {
  const totalPageCount = Math.ceil(totalCount / pageSize)
  const pageButtonStyle: CSSProperties = {
    border: '1px solid #000',
    width: '30px',
    textAlign: 'center'
  }
  return (
    <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
      {
        // ページ数が２ページ以上のとき、「<」ボタンを表示する
        totalPageCount > 1 &&
        <div
          style={{
            ...pageButtonStyle,
            backgroundColor: page <= 1 ? '#dcdcdc' : 'transparent',
          }}
          onClick={() => {
            if (page <= 1) return
            onPageChange(page - 1)
          }}
        >
          {'<'}
        </div>
      }
      {
        [...Array(totalPageCount)].map((_, index) => (
          index + 1 === page
            ? (
              <div key={index}
                   style={{
                     ...pageButtonStyle,
                     marginLeft: '8px',
                     backgroundColor: '#f0f8ff'
                   }}
              >
                {index + 1}
              </div>
            )
            : (
              <div key={index}
                   style={{
                     ...pageButtonStyle,
                     marginLeft: '8px'
                   }}
                   onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </div>
            )
        ))
      }
      {
        // ページ数が２ページ以上のとき、「>」ボタンを表示する
        totalPageCount > 1 &&
        <div
          style={{
            ...pageButtonStyle,
            marginLeft: '8px',
            backgroundColor: page >= totalPageCount ? '#dcdcdc' : 'transparent',
          }}
          onClick={() => {
            if (page >= totalPageCount) return
            onPageChange(page + 1)
          }}
        >
          {'>'}
        </div>
      }
    </div>
  )
}

export default function TableScratchWithPager() {
  const [searchWord, setSearchWord] = useTextInput()
  const [tableUserData, setTableUserData] = useState<Array<TableUser>>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    (async () => {
      const newUsers = await fetchUsers({name: null, page: 1, pageSize: 2})
      setTableUserData(newUsers.users)
      setTotalCount(newUsers.totalCount)
      setCurrentPage(1)
    })()
  }, [])

  const handleSearch = async (newPage: number) => {
    const newUsers = await fetchUsers({name: searchWord.value, page: newPage, pageSize: 2})
    setTableUserData(newUsers.users)
    setTotalCount(newUsers.totalCount)
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
              onClick={() => handleSearch(1)}
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
        <Pager
          totalCount={totalCount}
          page={currentPage}
          pageSize={2}
          onPageChange={handleSearch}
        />
      </Box>
    </main>
  )
}