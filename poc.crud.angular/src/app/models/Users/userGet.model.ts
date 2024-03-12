export interface UserGetResponse {
    data: UserGet
  }
  
  export interface UserGet {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
  }
  