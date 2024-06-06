import { NextRequest, NextResponse } from "next/server"
import {parentChildSelectItems} from "@/data/data";
import {ParentChildSelectItem} from "@/types/parent-child-select";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const params = await request.json()
    const filteredItems: ParentChildSelectItem[] = parentChildSelectItems.filter(item => item.parentId === params.parentId)
    return NextResponse.json({
        items: filteredItems
    })
}