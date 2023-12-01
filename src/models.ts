export type apiResponse<T> = {
    status : "valid" | "invalid"
    message : String
    data : T | null
}