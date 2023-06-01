type Props = React.HTMLProps<HTMLInputElement> & {
  value?: number;
  onChange: (e: any) => void;
};

export const NumericInput = ({ value, onChange, ...props }: Props) => {
  return <input
    type="text"
    inputMode="numeric"
    pattern="[0-9]*"
    value={value}
    onChange={(e) => {
      const { value: v } = e.target;
      const n = v && Number(v);
      if (!Number.isNaN(n)) {
        onChange(n);
      } else {
        onChange(value);
      }
    }}
    autoComplete="one-time-code"
    {...props}
  />
}