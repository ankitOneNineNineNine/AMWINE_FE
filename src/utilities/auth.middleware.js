export function isAuthorized(user){
    
        if(user.role && user.role.substring(0,5).toLowerString() === 'admin'){
            return true;
        }
    else return false;
}

