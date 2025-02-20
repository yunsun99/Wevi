import { forwardRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { result, targetTime, isOpen, onClose },
  ref
) {
  if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링하지 않음

  return createPortal(
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 pt-20">
      <dialog
        ref={ref}
        open
        className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm"
      >
        <h2 className="text-xl font-bold">You {result}</h2>
        <p className="mt-2">
          Target time was <strong>{targetTime}</strong>
        </p>
        <p className="mt-2">You stopped</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Close
        </button>
      </dialog>
    </div>,
    document.body // 모달을 최상위에 추가
  );
});

export default ResultModal;
