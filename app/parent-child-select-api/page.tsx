'use client'
import {Box, Button} from "@mui/material";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {parentChildSelectItems} from "@/data/data";
import {FetchItemsRequestType, ParentChildSelectItem} from "@/types/parent-child-select"

const isUseMockData = true

const fetchItems = async (param: FetchItemsRequestType): Promise<Array<ParentChildSelectItem>> => {
  if (isUseMockData) {
    return parentChildSelectItems.filter(item => item.parentId === param.parentId)
  } else {
    const response = await fetch('/api/parent-child-select/items', {
      method: 'POST',
      body: JSON.stringify(param)
    })
    const {items} = await response.json()
    return items
  }
}

export default function ParentChildSelect() {
  const [items, setItems] = useState<Array<ParentChildSelectItem>>([])
  const [subItems, setSubItems] = useState<Array<ParentChildSelectItem>>([])
  const [subSubItems, setSubSubItems] = useState<Array<ParentChildSelectItem>>([])

  useEffect(() => {
    (async () => {
      const newItems = await fetchItems({ parentId: null })
      setItems(newItems)
    })()
  }, [])


  const handleChangeItem = async (event: ChangeEvent<HTMLSelectElement>) => {
    const newSubItem = await fetchItems({ parentId: parseInt(event.target.value) })
    setSubItems(newSubItem)
    setSubSubItems([])
  }

  const handleChangeSubItem = async (event: ChangeEvent<HTMLSelectElement>) => {
    const newSubSubItem = await fetchItems({ parentId: parseInt(event.target.value) })
    setSubSubItems(newSubSubItem)
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const item = form.get("item") ? items.find(item => item.id === parseInt(form.get("item") as string))?.value : "";
    const subItem = form.get("subItem") ? subItems.find(subItem => subItem.id === parseInt(form.get("subItem") as string))?.value : "";
    const subSubItem = form.get("subSubItem") ? subSubItems.find(subSubItem => subSubItem.id === parseInt(form.get("subSubItem") as string))?.value : "";
    alert(
      `item: ${item}\nsubItem: ${subItem}\nsubSubItem: ${subSubItem}`
    );
  }

  return (
    <main>
      <Box mt={2} ml={2}>
        <form onSubmit={onSubmit}>
          <Button type="submit" variant="contained">submit</Button>
          <Box mt={2}>
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
              parent-child-select.map(item => (
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