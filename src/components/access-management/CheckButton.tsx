import Icon from '@/components/common/Icon';
import { Text } from '@/components/common/text';

type ICheckButton = {
  id: string | number;
  label: string;
  checked?: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckButton = ({
  id,
  label,
  checked,
  onChange,
  className = '',
}: ICheckButton) => {
  return (
    <label
      htmlFor={id.toString()}
      className={`inline-block py-space6 px-space10 rounded-lg border ${
        checked ? 'bg-primary-100 border-primary-100' : 'border-primary-20'
      } cursor-pointer ${className}`}
    >
      <input
        value={id}
        type="checkbox"
        className="hidden"
        id={id.toString()}
        onChange={onChange}
      />

      <Text
        className={`flex items-center gap-space6 ${className}`}
        variant={checked ? 'white' : 'primary'}
      >
        <span
          className={`h-[1.4rem] w-[1.4rem] flex items-center justify-center rounded-sm
          ${checked ? 'text-black bg-white border-white' : 'border border-primary-30'}
          `}
        >
          {checked && <Icon icon="mingcute:check-fill" width={9} height={9} />}
        </span>

        {label}
      </Text>
    </label>
  );
};

export default CheckButton;
