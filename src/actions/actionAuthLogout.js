const actionAuthLogout = () => 
(dispatch) => {        
    dispatch({type: 'AUTH_LOGOUT'})
    localStorage.removeItem('authToken')
}

export default actionAuthLogout
