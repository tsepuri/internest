export const getSessionCookie = () => {
    let sessionCookie = document.cookie.split(";").find(cookie => cookie.trim().startsWith("__session="))
    if (sessionCookie) {
        const sessionValue = sessionCookie.split('=')[1]
        console.log('Session value found')
        return sessionValue
    }
    else {
        console.log('Session value not found')
        return
    }
}
