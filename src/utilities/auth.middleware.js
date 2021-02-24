export function isAuthorized(user){
        if(user && user.role &&user.role.substring(0,5).toLowerCase() === 'admin'){
            return true;
        }
    else return false;
}

