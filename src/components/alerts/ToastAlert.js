import { toast } from 'react-toastify'

export const alertToastInfo = (message) => {
    toast.info(message)
}

export const alertToastSuccess = (message) => {
    toast.success(message);
}

export const alertToastWarn = (message) => {
    toast.warn(message);
}

export const alertToastError = (message) => {
    toast.error(message)
}