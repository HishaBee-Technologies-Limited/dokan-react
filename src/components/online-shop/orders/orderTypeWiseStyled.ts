import { ORDER_STATUS } from '@/config/orders';

export const orderTypeWiseStyled = (type: string) => {
  const textVariant = ():
    | 'blue'
    | 'warning'
    | 'success'
    | 'error'
    | undefined => {
    switch (type) {
      case ORDER_STATUS.ACCEPTED:
        return 'blue';
      case ORDER_STATUS.PENDING:
        return 'warning';
      case ORDER_STATUS.COMPLETED:
        return 'success';
      case ORDER_STATUS.CANCELLED:
        return 'error';
      default:
        return undefined;
    }
  };
  const textBackground = () => {
    switch (type) {
      case ORDER_STATUS.ACCEPTED:
        return 'bg-blue-100 dark:bg-primary-80';
      case ORDER_STATUS.PENDING:
        return 'bg-warning-10 dark:bg-primary-80';
      case ORDER_STATUS.COMPLETED:
        return 'bg-success-20 dark:bg-primary-80';
      case ORDER_STATUS.CANCELLED:
        return 'bg-error-10 dark:bg-primary-80';
      default:
        return undefined;
    }
  };
  const title = () => {
    switch (type) {
      case ORDER_STATUS.ACCEPTED:
        return 'Accepted';
      case ORDER_STATUS.PENDING:
        return 'Pending';
      case ORDER_STATUS.COMPLETED:
        return 'Complete';
      case ORDER_STATUS.CANCELLED:
        return 'Cancelled';
      default:
        return 'N/A';
    }
  };

  return {
    title,
    textVariant,
    textBackground,
  };
};
