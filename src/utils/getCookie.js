export const getCookie = (name) => {
    const cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split('=');
        const cookieName = cookiePair[0].trim();
        if (cookieName === name) {
            try {
                return JSON.parse(decodeURIComponent(cookiePair[1]));
            } catch (e) {
                console.error('Error parsing cookie:', e);
                return [];
            }
        }
    }
    return [];
};