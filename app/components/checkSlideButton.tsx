import { useAtom } from "jotai";
import { isSlideModalAtom } from "~/atoms";

export function SlideCheckButton() {
  const [isSlideModal, setIsSlideModal] = useAtom(isSlideModalAtom);
  return (
    <button
      className="bg-teal-300 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded shadow-md flex items-center justify-center"
      onClick={() => setIsSlideModal(!isSlideModal)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm6 6H7v4h6v-4z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-sm">スライドで確認</span>
    </button>
  );
}

export default SlideCheckButton;
