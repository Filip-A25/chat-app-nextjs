interface Props {
  username: string;
  message: string;
}

export function MessageCard({ username, message }: Props) {
  return (
    <div className="py-2">
      <span className="font-semibold">{username}</span>
      <span className="mx-3">{message}</span>
    </div>
  );
}
