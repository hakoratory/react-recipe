import {NextRequest, NextResponse} from "next/server"
import {tableUsers} from "@/data/data";
import {FetchTableUsersWithPageRequestType, TableUser} from "@/types/table";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const params: FetchTableUsersWithPageRequestType = await request.json()
  const filteredUsers: TableUser[] = tableUsers.filter(user => user.name.indexOf(params.name ?? '') > -1)
  const from = (params.page - 1) * params.pageSize
  const to = params.page * params.pageSize
  return NextResponse.json({
    users: filteredUsers.slice(from, to),
    totalCount: filteredUsers.length
  })
}