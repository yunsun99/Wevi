// import Input from "@/components/Inputs/Input_gray";
// import Button1 from "@/components/Buttons/Button1";

// const Signup1 = ({ fromData, setFormData, onNext }) {
//     const [enteredValues, setEnteredValues] = useState({
//       email: "",
//       password: "",
//       passwordConfirm: "",
//     });

//     function handleSubmit(event) {
//       event.preventDefault();
//       console.log(enteredValues);
//       // 비밀번호와 비밀번호 확인 같은지 검사
//       if (enteredValues.password !== enteredValues.passwordConfirm) {
//         console.log("wrong");
//       }
//     }

//     function handleInputChange(identifier, value) {
//       setEnteredValues((preValues) => ({
//         ...preValues,
//         [identifier]: value,
//       }));
//     }

//     return (
//       <div className="min-h-screen w-screen flex items-center justify-center bg-gray-200">
//         <div className="w-screen sm:max-w-sm md:max-w-md lg:max-w-lg  bg-white shadow-md rounded-lg p-6 space-y-6">
//           <h1 className="text-xl font-bold text-gray-800">회원가입</h1>
//           <form onSubmit={handleSubmit} className="">
//             {/* 이메일 입력 */}
//             <div className="flex items-center space-x-4 space-y-4">
//               <input
//                 id="email"
//                 type="email"
//                 name="email"
//                 onChange={(event) =>
//                   handleInputChange("email", event.target.value)
//                 }
//                 value={enteredValues.email}
//                 placeholder="이메일"
//                 className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
//               />
//               <button className="bg-blue-500 text-black px-4 py-2 rounded-lg hover:bg-blue-600 transition">
//                 본인인증
//               </button>
//             </div>

//             {/* 비밀번호 입력 */}
//             <div className="space-y-4">
//               <input
//                 id="password"
//                 type="password"
//                 name="password"
//                 onChange={(event) =>
//                   handleInputChange("password", event.target.value)
//                 }
//                 value={enteredValues.password}
//                 placeholder="비밀번호"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
//               />
//               <input
//                 id="passwordConfirm"
//                 type="password"
//                 name="passwordConfirm"
//                 onChange={(event) =>
//                   handleInputChange("passwordConfirm", event.target.value)
//                 }
//                 value={enteredValues.passwordConfirm}
//                 placeholder="비밀번호 확인"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
//               />
//             </div>
//           </form>

//           {/* 안내문구 */}
//           <p className="text-center text-gray-600 text-sm">
//             본인 인증안되거나 비번 2개 다르면 비활성화
//           </p>

//           {/* 다음 버튼 */}
//           <Button1 onClick={handleSubmit}>다음</Button1>
//         </div>
//       </div>
//     );
//   }
