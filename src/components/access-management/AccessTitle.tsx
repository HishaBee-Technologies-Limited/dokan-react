import Icon from '@/components/common/Icon';

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
    <article
      className={`text-md text-500 flex items-center gap-1 ${className} `}
    >
      {!removeCheck && (
        <span
          className={`h-[1.4rem] w-[1.4rem] flex items-center justify-center rounded-sm border-[1.6px] border-primary-20 ${
            active
              ? 'text-white bg-success-100 border-success-100'
              : 'text-text500 border-primary-20'
          }`}
        >
          <Icon icon="mingcute:check-fill" width={9} height={9} />
        </span>
      )}

      {title}
    </article>
  );
};

export default AccessTitle;
