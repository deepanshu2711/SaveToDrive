export type User = {
    id: String,
    email: String,
    fullName: String,
    imageUrl: String,
    password: String
}


export type File = {
    id: String,
    userId: String,
    title: String,
    fileUrl: String,
    type: String
}