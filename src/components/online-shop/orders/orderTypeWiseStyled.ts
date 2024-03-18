export const orderTypeWiseStyled = (type: string) => {

    const textVariant = (): "blue" | "warning" | "success" | "error" | undefined => {
        switch (type) {
            case 'accepted':
                return 'blue'
            case 'pending':
                return 'warning'
            case 'completed':
                return 'success'
            case 'cancelled':
                return 'error'
            default:
                return undefined
        }
    }
    const textBackground = () => {
        switch (type) {
            case 'accepted':
                return 'bg-blue-100 dark:bg-primary-80'
            case 'pending':
                return 'bg-warning-10 dark:bg-primary-80'
            case 'completed':
                return 'bg-success-20 dark:bg-primary-80'
            case 'cancelled':
                return 'bg-error-10 dark:bg-primary-80'
            default:
                return undefined
        }
    }
    const title = () => {
        switch (type) {
            case 'accepted':
                return 'Accepted'
            case 'pending':
                return 'Pending'
            case 'completed':
                return 'Complete'
            case 'cancelled':
                return 'Cancelled'
            default:
                return 'N/A'
        }
    }

    return {
        title,
        textVariant,
        textBackground,
    }

}