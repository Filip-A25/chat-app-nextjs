interface Props {
  label: string;
  data: string;
}

export function DataElement({ label, data }: Props) {
  return (
    <li className="py-2 md:py-3">
      <span className="max-sm:flex max-sm:flex-col max-sm:items-center">
        {label} <span className="font-semibold max-sm:text-md">{data}</span>
      </span>
    </li>
  );
}
