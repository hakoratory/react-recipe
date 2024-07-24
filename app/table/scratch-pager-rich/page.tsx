'use client'

import '../style.css'
import {Box, Button} from "@mui/material";
import {Input} from "@/components/input";
import {useTextInput} from "@/hooks/use-text-input";
import {tableUsers} from "@/data/data";
import {
  FetchTableUsersWithPageRequestType,
  FetchTableUsersWithPageResponseType,
  RichPagerProps,
  TableUser
} from "@/types/table";
import {ChangeEvent, CSSProperties, useEffect, useState} from "react";
import usePagination from "@mui/material/usePagination";

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

const Pager = ({totalCount, page, pageSize, onPageChange}: RichPagerProps) => {
  const totalPageCount = Math.ceil(totalCount / pageSize)
  // 表示中の件数表示 from - to
  const from = (page - 1) * pageSize + 1
  const to = page < totalPageCount ? page * pageSize : totalCount

  const pageButtonStyle: CSSProperties = {
    border: '1px solid #000',
    width: '30px',
    textAlign: 'center'
  }

  const {items} = usePagination({
    count: totalPageCount,
    page: page,
    onChange: onPageChange
  })

  useEffect(() => {
    console.log('Math.ceil(totalCount / pageSize)', Math.ceil(totalCount / pageSize))
    console.log(items)
  }, [items]);

  return (
    <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
      {
        totalCount > 0 &&
        <div style={{marginRight: '16px'}}>
          {from} - {to} of {totalCount}
        </div>
      }
      {
        items.map((item, index) => {
          switch (item.type) {
            case 'first':
              return (
                <div key={index} style={{...pageButtonStyle, pointerEvents: item.disabled ? 'none' : 'initial'}}
                     onClick={item.onClick}>
                  {'<<'}
                </div>
              )
            case 'previous':
              return (
                <div key={index}
                     style={{...pageButtonStyle, marginLeft: '8px', pointerEvents: item.disabled ? 'none' : 'initial'}}
                     onClick={item.onClick}>
                  {'<'}
                </div>
              )
            case 'start-ellipsis':
            case 'end-ellipsis':
              return (
                <div key={index} style={{...pageButtonStyle, marginLeft: '8px',}} onClick={item.onClick}>
                  {'...'}
                </div>
              )
            case 'page':
              return (
                <div key={index}
                     style={{
                       ...pageButtonStyle,
                       marginLeft: '8px',
                       backgroundColor: item.selected ? '#f0f8ff' : 'transparent'
                     }}
                     onClick={item.onClick}
                >
                  {item.page}
                </div>
              )
            case 'next':
              return (
                <div key={index} style={{...pageButtonStyle, marginLeft: '8px',}} onClick={item.onClick}>
                  {'>'}
                </div>
              )
            case 'last':
              return (
                <div key={index} style={{...pageButtonStyle, marginLeft: '8px',}} onClick={item.onClick}>
                  {'>>'}
                </div>
              )
          }
        })
      }
    </div>
  )
}

export default function TableScratchWithPagerRich() {
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

  const handleSearch = async (event: ChangeEvent<unknown>, newPage: number) => {
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
              onClick={(e) => handleSearch(e, 1)}
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