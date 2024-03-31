import Icon from '@/components/common/Icon';
import { Text } from '@/components/common/text';

type IAccessTitle = {
  title: string;
  active?: boolean;
  className?: string;
  removeCheck?: boolean;
};

const AccessTitle = ({
  active,
  title,
  removeCheck,
  className = '',
}: IAccessTitle) => {
  return (
    <Text className={`flex items-center gap-space6 ${className}`}>
      {!removeCheck && (
        <span
          className={`h-[1.4rem] w-[1.4rem] flex items-center justify-center rounded-sm  ${
            active
              ? 'text-white bg-success-100 border-success-100'
              : 'border-[.2rem] border-primary-80'
          }`}
        >
          {active && <Icon icon="mingcute:check-fill" width={9} height={9} />}
        </span>
      )}

      {title}
    </Text>
  );
};

export default AccessTitle;
