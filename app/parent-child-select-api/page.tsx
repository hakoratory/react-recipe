'use client'
import {Box} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import useSWR from "swr";

const isUseMockData = true

const useFetch = (url: string, param: any) => {
  const [data, setData] = useState<any>(null)
  useEffect(() => {
    if (isUseMockData) {
      setData({
        id: 1,
        name: 'taro'
      })
    } else {
      (async () => {
        // fetch('https://jsonplaceholder.typicode.com/todos/1')
        //   .then(response => response.json())
        //   .then(json => setData(json))
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        const json = await response.json()
      })()
    }
  },[])
  return data
}

const useReFetch = (url: string, param: any) => {
  const [data, setData] = useState<any>(null)
  useEffect(() => {
    if (isUseMockData) {
      setData({
        id: 1,
        name: 'taro'
      })
    } else {
      (async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        const json = await response.json()
      })()
    }
  },[])

  const get = async () => {
    if (isUseMockData) {
      return {
        id: 1,
        name: 'taro'
      }
    } else {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      return await response.json()

    }
  }

  return [data, get]
}

// 大項目
const items = [
  {
    id: 1,
    value: 'item-1'
  },
  {
    id: 2,
    value: 'item-2'
  },
]
// 中項目
const subItems = [
  {
    id: 3,
    parentId: 1,
    value: 'item-1-1'
  },
  {
    id: 4,
    parentId: 1,
    value: 'item-1-2'
  },
  {
    id: 5,
    parentId: 2,
    value: 'item-2-1'
  },
  {
    id: 6,
    parentId: 2,
    value: 'item-2-2'
  },
]
// 小項目
const subSubItems = [
  {
    id: 7,
    parentId: 3,
    value: 'item-1-1-1'
  },
  {
    id: 8,
    parentId: 3,
    value: 'item-1-1-2'
  },
  {
    id: 9,
    parentId: 4,
    value: 'item-1-2-1'
  },
  {
    id: 10,
    parentId: 4,
    value: 'item-1-2-2'
  },
  {
    id: 11,
    parentId: 5,
    value: 'item-2-1-1'
  },
  {
    id: 12,
    parentId: 5,
    value: 'item-2-1-2'
  },
  {
    id: 13,
    parentId: 5,
    value: 'item-2-2-1'
  },
  {
    id: 14,
    parentId: 5,
    value: 'item-2-2-2'
  },
]

export default function ParentChildSelect() {
  const [datas, get] = useReFetch('', {})
  useEffect(() => {
    (async () => {
      const result = await get()
      console.log('result', result)
    })()
  }, [])

  useEffect(() => {
    console.log('datas', datas);
  },[datas])

  const [selectedItemId, setSelectedItemId] = useState<string>('')
  const [selectedSubItemId, setSelectedSubItemId] = useState<string>('')
  const [selectedSubSubItemId, setSelectedSubSubItemId] = useState<string>('')

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isValidating, mutate } = useSWR('/items', fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateOnMount: false,
  });

  useEffect(() => {
    console.log('data', data)
  },[data])

  const handleChangeItem = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedItemId(event.target.value)
    setSelectedSubItemId('')
    setSelectedSubSubItemId('')
  }

  const handleChangeSubItem = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubItemId(event.target.value)
    setSelectedSubSubItemId('')
  }

  const handleChangeSubSubItem = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubSubItemId(event.target.value)
  }

  const onClick = async () => {
    //mutate()
    const test = await fetch('/items')
    console.log('test', test)
  }

  return (
    <main>
      <Box mt={2} ml={2}>
        <button type="button" onClick={onClick}>test</button>
        <Box>
          <Box>
            大項目
          </Box>
          <Box>
            <select className="w-40" onChange={handleChangeItem}>
              <option value=""></option>
              {
                items.map(item => (
                  <option key={item.id} value={item.id}>{item.value}</option>
                ))
              }
            </select>
          </Box>
        </Box>
        <Box mt={2}>
          <Box>
            中項目
          </Box>
          <Box>
            <select className="w-40" onChange={handleChangeSubItem}>
              <option value=""></option>
              {
                subItems.filter(subItem => subItem.parentId === parseInt(selectedItemId))
                  .map(subItem => (
                    <option key={subItem.id} value={subItem.id}>{subItem.value}</option>
                  ))
              }
            </select>
          </Box>
        </Box>
        <Box mt={2}>
          <Box>
            小項目
          </Box>
          <Box>
            <select className="w-40" onChange={handleChangeSubSubItem}>
              <option value=""></option>
              {
                subSubItems.filter(subSubItem => subSubItem.parentId === parseInt(selectedSubItemId))
                  .map(subSubItem => (
                    <option key={subSubItem.id} value={subSubItem.id}>{subSubItem.value}</option>
                  ))
              }
            </select>
          </Box>
        </Box>
      </Box>
      <Box mt={6} ml={2}>
        <Box>デバッグセクション</Box>
        <Box mt={2}>
          <Box>大項目の value</Box>
          <Box>
            {
              items.map(item => (
                  <Box key={item.id} className={item.id === parseInt(selectedItemId) ? 'font-bold' : ''}>{item.value}</Box>
                ))
            }
          </Box>
        </Box>
        <Box mt={2}>
          <Box>中項目の value</Box>
          <Box>
            {
              subItems.filter(subItem => subItem.parentId === parseInt(selectedItemId))
                .map(subItem => (
                  <Box key={subItem.id} className={subItem.id === parseInt(selectedSubItemId) ? 'font-bold' : ''}>{subItem.value}</Box>
                ))
            }
          </Box>
        </Box>
        <Box mt={2}>
          <Box>小項目の value</Box>
          <Box>
            {
              subSubItems.filter(subSubItem => subSubItem.parentId === parseInt(selectedSubItemId))
                .map(subSubItem => (
                  <Box key={subSubItem.id} className={subSubItem.id === parseInt(selectedSubSubItemId) ? 'font-bold' : ''}>{subSubItem.value}</Box>
                ))
            }
          </Box>
        </Box>
      </Box>
    </main>
  );
}