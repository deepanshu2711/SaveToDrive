import { User } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
interface UserState {
    currentUser: User | null
}

const initialState: UserState = {
    currentUser: null
}

export const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<User>) {
            state.currentUser = action.payload
        },
        removeCurrentUser(state) {
            state.currentUser = null
        }
    }
})


export const { setCurrentUser, removeCurrentUser } = userReducer.actions
export const selectUser = (state: any) => state.user.currentUser
export default userReducer.reducer