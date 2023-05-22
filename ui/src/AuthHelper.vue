

<script>
// header function
export const authHeader = (req) => {
    req = req??{}
    return {
        // js specifc syntax - if req is null then return an empty object       
        //making a shallow cody of the intire request but with a new header attached
        // making a null check - ... means everything that is in the request req - spread operator
        ...req,
        headers: { 
            ...(req.headers??{}),
            "auth-token": localStorage.getItem('token') }
    }
}
</script>
