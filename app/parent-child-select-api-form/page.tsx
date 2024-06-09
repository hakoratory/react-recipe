'use client'
import {Box, Button} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import {parentChildSelectItems} from "@/data/data";
import {FetchItemsRequestType, ParentChildSelectItem, ParentChildSelectItemForm} from "@/types/parent-child-select"

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

export default function ParentChildSelectApiForm() {
  const [items, setItems] = useState<Array<ParentChildSelectItem>>([])
  const [subItems, setSubItems] = useState<Array<ParentChildSelectItem>>([])
  const [subSubItems, setSubSubItems] = useState<Array<ParentChildSelectItem>>([])
  const [formData, setFormData] = useState<ParentChildSelectItemForm>({
    itemId: null,
    subItemId: null,
    subSubItemId: null,
  })

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

    const newFormData: ParentChildSelectItemForm = {...formData, itemId: parseInt(event.target.value)}
    setFormData(newFormData)
  }

  const handleChangeSubItem = async (event: ChangeEvent<HTMLSelectElement>) => {
    const newSubSubItem = await fetchItems({ parentId: parseInt(event.target.value) })
    setSubSubItems(newSubSubItem)

    const newFormData: ParentChildSelectItemForm = {...formData, subItemId: parseInt(event.target.value)}
    setFormData(newFormData)
  }

  const handleChangeSubSubItem = async (event: ChangeEvent<HTMLSelectElement>) => {
    const newFormData: ParentChildSelectItemForm = {...formData, subSubItemId: parseInt(event.target.value)}
    setFormData(newFormData)
  }

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const item = formData.itemId ? items.find(item => item.id === formData.itemId)?.value : ''
    const subItem = formData.subItemId ? subItems.find(subItem => subItem.id === formData.subItemId)?.value : ''
    const subSubItem = formData.subSubItemId ? subSubItems.find(subSubItem => subSubItem.id === formData.subSubItemId)?.value : ''
    alert(
        `item: ${item}\nsubItem: ${subItem}\nsubSubItem: ${subSubItem}`
    );
  }

  return (
    <main>
      <Box mt={2} ml={2}>
        <Button type="button" variant="contained" onClick={handleClick}>submit</Button>
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
            <select className="w-40" onChange={handleChangeSubSubItem} name="subSubItem">
              <option value=""></option>
              {
                subSubItems.map(subSubItem => (
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
                  <Box key={item.id} className={item.id === formData.itemId ? 'font-bold' : ''}>{item.value}</Box>
                ))
            }
          </Box>
        </Box>
        <Box mt={2}>
          <Box>中項目の value</Box>
          <Box>
            {
              subItems.filter(subItem => subItem.parentId === formData.itemId)
                .map(subItem => (
                  <Box key={subItem.id} className={subItem.id === formData.subItemId ? 'font-bold' : ''}>{subItem.value}</Box>
                ))
            }
          </Box>
        </Box>
        <Box mt={2}>
          <Box>小項目の value</Box>
          <Box>
            {
              subSubItems.filter(subSubItem => subSubItem.parentId === formData.subItemId)
                .map(subSubItem => (
                  <Box key={subSubItem.id} className={subSubItem.id === formData.subSubItemId ? 'font-bold' : ''}>{subSubItem.value}</Box>
                ))
            }
          </Box>
        </Box>
      </Box>
    </main>
  );
}