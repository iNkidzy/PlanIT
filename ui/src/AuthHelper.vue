

<script>
// header function
export const authHeader = () => {
    return {
        headers: { "auth-token": localStorage.getItem('token') }
    }
}
</script>
