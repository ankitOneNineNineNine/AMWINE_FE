import {toast} from 'react-toastify';

export function successNotification(message){
    toast.success(message)
}

export function failureNotification(error){
    toast.error(error)
}

export function warningNotification(warning){
    toast.warn(warning)
}
export function updateNotification(message){
    toast.update(message)
}