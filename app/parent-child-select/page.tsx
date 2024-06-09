'use client'
import {Box} from "@mui/material";
import {ChangeEvent, useState} from "react";

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

export default function ParentChildSelectApi() {
  const [selectedItemId, setSelectedItemId] = useState<string>('')
  const [selectedSubItemId, setSelectedSubItemId] = useState<string>('')
  const [selectedSubSubItemId, setSelectedSubSubItemId] = useState<string>('')

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

  return (
    <main>
      <Box mt={2} ml={2}>
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