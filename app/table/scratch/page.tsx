'use client'

import '../style.css'
import {Box} from "@mui/material";
import {Input} from "@/components/input";
import {useTextInput} from "@/hooks/use-text-input";

export default function TableScratch() {
    const [searchWord, setSearchWord] = useTextInput()
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
                    <tr>
                        <td>佐藤 健太</td>
                        <td>営業部</td>
                        <td>とんかつ</td>
                    </tr>
                    <tr>
                        <td>鈴木　二郎</td>
                        <td>システム開発部</td>
                        <td>ラーメン</td>
                    </tr>
                    </tbody>
                </table>
            </Box>
        </main>
    )
}