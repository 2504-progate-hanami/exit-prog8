type HomeButtonProps = {
  detail: string;
  onC: () => void;
};

export function HomeButton({ detail, onC }: HomeButtonProps) {
  return (
    <button
      onClick={onC}
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
    >
      {detail}
    </button>
  );
}
