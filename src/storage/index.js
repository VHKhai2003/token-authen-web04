export const saveUser = (user) => {
    localStorage.setItem('email', user.email);
    localStorage.setItem('accessToken', user.accessToken);
}

export const loadUser = () => {
    const email = localStorage.getItem('email');
    const accessToken = localStorage.getItem('accessToken');
    return {
        email, accessToken
    };
}

export const removeUser = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('accessToken');
}