export const getSessionCookie = () => {
    let sessionCookie = document.cookie.split(";").find(cookie => cookie.trim().startsWith("__session="))
    if (sessionCookie) {
        const sessionValue = sessionCookie.split('=')[1]
    }
}