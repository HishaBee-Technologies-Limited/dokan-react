export const orderTypeWiseStyled = (type: string) => {

    const textVariant = (): "blue" | "warning" | "success" | "error" | undefined => {
        if (type === 'new') {
            return 'blue'
        } else if (type === 'pending') {
            return 'warning'
        } else if (type === 'complete') {
            return 'success'
        } else if (type === 'cancelled') {
            return 'error'
        } else {
            return undefined
        }
    }
    const textBackground = () => {
        if (type === 'new') {
            return 'bg-blue-100'
        } else if (type === 'pending') {
            return 'bg-warning-10'
        } else if (type === 'complete') {
            return 'bg-success-20'
        } else if (type === 'cancelled') {
            return 'bg-error-10'
        } else {
            return undefined
        }
    }
    const title = () => {
        if (type === 'new') {
            return 'New Order'
        } else if (type === 'pending') {
            return 'Pending'
        } else if (type === 'complete') {
            return 'Complete'
        } else if (type === 'cancelled') {
            return 'Cancelled'
        } else {
            return undefined
        }
    }

    return {
        title,
        textVariant,
        textBackground,
    }

}