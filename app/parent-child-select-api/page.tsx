'use client'
import {Box} from "@mui/material";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";

const isUseMockData = true

type FetchItemsRequestType = {
  parentId: number | null
}

type ItemType = {
  id: number,
  parentId: number | null,
  value: string
}

const fetchItems = async (url: string, param: FetchItemsRequestType): Promise<Array<ItemType>> => {
  if (isUseMockData) {
    return items.filter(item => item.parentId === param.parentId)
  } else {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    return await response.json()
  }
}

// 大項目
const items: Array<ItemType> = [
  {
    id: 1,
    parentId: null,
    value: 'item-1'
  },
  {
    id: 2,
    parentId: null,
    value: 'item-2'
  },
  // 中項目
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
  // 小項目
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
  const [items, setItems] = useState<Array<ItemType>>([])
  const [subItems, setSubItems] = useState<Array<ItemType>>([])
  const [subSubItems, setSubSubItems] = useState<Array<ItemType>>([])

  useEffect(() => {
    (async () => {
      const newItems = await fetchItems('/items', { parentId: null })
      console.log('newItems', newItems)
      setItems(newItems)
    })()
  }, [])


  const handleChangeItem = async (event: ChangeEvent<HTMLSelectElement>) => {
    const newSubItem = await fetchItems('/items', { parentId: parseInt(event.target.value) })
    setSubItems(newSubItem)
    setSubSubItems([])
  }

  const handleChangeSubItem = async (event: ChangeEvent<HTMLSelectElement>) => {
    const newSubSubItem = await fetchItems('/items', { parentId: parseInt(event.target.value) })
    setSubSubItems(newSubSubItem)
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const item = form.get("item") || "";
    const subItem = form.get("subItem") || "";
    const subSubItem = form.get("subSubItem") || "";
    alert(
      `item: ${item}\nsubItem: ${subItem}\nsubSubItem: ${subSubItem}`
    );
  }

  return (
    <main>
      <Box mt={2} ml={2}>
        <form onSubmit={onSubmit}>
          <button type="submit">test</button>
          <Box>
            <Box>
              大項目
            </Box>
            <Box>
              <select className="w-40" onChange={handleChangeItem} name="item">
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
              <select className="w-40" onChange={handleChangeSubItem} name="subItem">
                <option value=""></option>
                {
                  subItems.map(subItem => (
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
              <select className="w-40" name="subSubItem">
                <option value=""></option>
                {
                  subSubItems.map(subSubItem => (
                      <option key={subSubItem.id} value={subSubItem.id}>{subSubItem.value}</option>
                    ))
                }
              </select>
            </Box>
          </Box>
        </form>
      </Box>
      {/*<Box mt={6} ml={2}>
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
      </Box>*/}
    </main>
  );
}