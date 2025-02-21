import { axiosCoupleReceive } from "../../api/coupleAxios";

export default function CardNotification({ data }) {
  // console.log(data);
  const handleRequest = async (status) => {
    try {
      const code = await axiosCoupleReceive(status);
      if (code === 200) {
        window.location.reload();
      }
    } catch (err) {
      // console.log(err.message);
    }
  };

  return (
    <div
      className={`w-full p-4 shadow-md rounded-lg border border-gray-200 
      ${data.isRead ? "bg-gray-200" : "bg-white"}`}
    >
      <p className="font-semibold flex items-center gap-1">
        <span className="text-green-600 text-xl">🍀</span>
        {data.title}
      </p>
      <p className="text-gray-700 text-sm mt-1">{data.message}</p>
      <p className="text-gray-500 text-xs mt-2">{formatDate(data.createdAt)}</p>
      {/* ✅ type=1일 때만 버튼 추가
      {data.type === "COUPLE_REQUEST_SENT" && (
        <div className="flex gap-2 mt-3">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg w-1/2"
            onClick={() => handleRequest("REJECTED")}
          >
            거절
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg w-1/2"
            onClick={() => handleRequest("ACCEPTED")}
          >
            수락
          </button>
        </div>
      )} */}
    </div>
  );
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("ko-KR", options);
}

function handleReject(notificationId) {
  // console.log(`연동 신청 거절됨: ${notificationId}`);
  // ❗ 여기에 API 호출 또는 상태 업데이트 추가 가능
}

function handleAccept(notificationId) {
  // console.log(`연동 신청 수락됨: ${notificationId}`);
  // ❗ 여기에 API 호출 또는 상태 업데이트 추가 가능
}
