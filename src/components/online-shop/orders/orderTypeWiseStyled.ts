export const orderTypeWiseStyled = (type: string) => {

    const textVariant = (): "blue" | "warning" | "success" | "error" | undefined => {
        switch (type) {
            case 'new':
                return 'blue'
            case 'pending':
                return 'warning'
            case 'complete':
                return 'success'
            case 'cancelled':
                return 'error'
            default:
                return undefined
        }
    }
    const textBackground = () => {
        switch (type) {
            case 'new':
                return 'bg-blue-100 dark:bg-primary-80'
            case 'pending':
                return 'bg-warning-10 dark:bg-primary-80'
            case 'complete':
                return 'bg-success-20 dark:bg-primary-80'
            case 'cancelled':
                return 'bg-error-10 dark:bg-primary-80'
            default:
                return undefined
        }
    }
    const title = () => {
        switch (type) {
            case 'new':
                return 'New Order'
            case 'pending':
                return 'Pending'
            case 'complete':
                return 'Complete'
            case 'cancelled':
                return 'Cancelled'
            default:
                return undefined
        }
    }

    return {
        title,
        textVariant,
        textBackground,
    }

}