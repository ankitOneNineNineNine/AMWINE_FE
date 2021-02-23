export function isAuthenticated(user){
    
    let token = localStorage.getItem('token');
    if(token & user)
        return true;

    else 
        return false;
}

export function isAuthorized(user){
    return true;
    if(isAuthenticated(user)){
        if(user.role.substring(0,5).toLowerString() === 'admin'){
            return true;
        }
    }
    else return false;
}

