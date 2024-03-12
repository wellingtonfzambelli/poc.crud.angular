  export interface UsersListResponse {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: UserList[]
  }

  export interface UserList {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
  }