import { NextRequest, NextResponse } from "next/server"
import {tableUsers} from "@/data/data";
import {FetchTableUsersRequestType, TableUser} from "@/types/table";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const params: FetchTableUsersRequestType = await request.json()
    const filteredUsers: TableUser[] = tableUsers.filter(user => user.name.indexOf(params.name ?? '') > -1)
    return NextResponse.json({
        users: filteredUsers
    })
}