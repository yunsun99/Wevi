# pip install fastapi uvicorn boto3 torch torchaudio whisper openai pydub soundfile requests huggingface_hub pdfplumbe
# ffmpeg 도 인스톨해야됌

from fastapi import FastAPI, HTTPException, BackgroundTasks
import os
import json
import whisper
import boto3
import torch
import time
import uuid
import openai
import torchaudio
import asyncio
import requests
from huggingface_hub import login
from pyannote.audio import Pipeline
from pydub import AudioSegment
import soundfile as sf
import json

with open("config.json", "r") as config_file:
    config = json.load(config_file)

app = FastAPI()

# # ✅ GPU 설정 (CUDA 가능하면 사용)
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# pipeline.to(device)
# ✅ GPU 설정 (없으면 CPU 사용)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = whisper.load_model("medium").to(device)

# 분석 결과를 백엔드로 반환할 때의 API
BACKEND_API_URL = "http://localhost:8080/api/ai/analyze/result"
# ✅ Hugging Face 로그인
HUGGINGFACE_ACCESS_TOKEN = config["HUGGINGFACE_ACCESS_TOKEN"]
login(token=HUGGINGFACE_ACCESS_TOKEN)
# ✅ OpenAI API 키 설정 (GPT-4 사용)
OPENAI_API_KEY = config["OPENAI_API_KEY"]

# ✅ AWS S3 설정 (IAM 사용자 키 입력)
AWS_ACCESS_KEY = config["AWS_ACCESS_KEY"]
AWS_SECRET_KEY = config["AWS_SECRET_KEY"]
AWS_DEFAULT_REGION = config["AWS_DEFAULT_REGION"]
S3_BUCKET_NAME = config["S3_BUCKET_NAME"]  #버켓 주소
s3_client = boto3.client('s3',
                      aws_access_key_id=AWS_ACCESS_KEY,
                      aws_secret_access_key=AWS_SECRET_KEY,
                      region_name=AWS_DEFAULT_REGION
                      )

# ✅ S3에서 파일 다운로드하는 함수
async def download_from_s3(s3_url):
    """S3에서 파일을 다운로드하여 로컬에 저장"""
    s3_key = s3_url.split(".amazonaws.com/")[-1]  # S3 객체 키 추출

    # ✅ 다운로드할 파일을 저장할 디렉토리 설정 (temp_audio 폴더 생성)
    # download_dir = "temp_audio"

    # 고유한 파일명 생성 (UUID 사용)
    unique_filename = f"{uuid.uuid4()}.m4a"
    local_path = os.path.join("temp_audio", unique_filename)
    os.makedirs("temp_audio", exist_ok=True)    # 없으면 만들기

    # 비동기 파일 다운로드 실행
    await asyncio.to_thread(s3_client.download_file, S3_BUCKET_NAME, s3_key, local_path)
    # loop = asyncio.get_event_loop()
    # await loop.run_in_executor(None, lambda: s3_client.download_file(S3_BUCKET_NAME, s3_key, local_path))
    # ✅ 파일 다운로드 실행
    # s3_client.download_file(S3_BUCKET_NAME, s3_key, local_path)
    print(f"✅ S3에서 다운로드 완료: {local_path}")

    return local_path  # 다운로드된 로컬 파일 경로 반환

# 🔹 Pyannote 최신 모델 로드
pipeline = Pipeline.from_pretrained(
    "pyannote/speaker-diarization-3.1",
    use_auth_token=HUGGINGFACE_ACCESS_TOKEN
)

# 📌 분석할 수 있는 파일 형식으로 변환
def ensure_wav_format(file_path):
    """ M4A 또는 WAV 파일을 PCM 16-bit, 16kHz, Mono로 변환 """
    if file_path.endswith(".m4a"):
        print("⚠️ M4A 파일이 감지됨. WAV로 변환 중...")
        file_path = convert_m4a_to_wav(file_path)  # M4A → WAV 변환

    try:
        # 🔍 WAV 파일 확인
        with sf.SoundFile(file_path) as f:
            if f.format != 'WAV' or f.subtype != 'PCM_16' or f.samplerate != 16000 or f.channels != 1:
                print("⚠️ WAV 파일이 PCM 16-bit, 16kHz, Mono 형식이 아님. 변환 필요!")

                # ✅ WAV를 PCM 16-bit, 16kHz, Mono로 변환
                audio = AudioSegment.from_wav(file_path)
                audio = audio.set_frame_rate(16000).set_channels(1).set_sample_width(2)
                
                converted_path = file_path.replace(".wav", "_fixed.wav")
                audio.export(converted_path, format="wav")

                print(f"📢 WAV 파일을 변환하여 저장: {converted_path}")
                return converted_path  # 변환된 파일 경로 반환

            else:
                print("✅ WAV 파일이 정상적인 PCM 16-bit, 16kHz, Mono 형식입니다.")
                return file_path

    except Exception as e:
        print(f"❌ WAV 파일 검사 실패: {e}")
        return None

# m4a 파일은 wav로 변환
def convert_m4a_to_wav(m4a_path):
    """
    M4A 파일을 WAV (16-bit PCM, 16kHz, Mono)로 변환하는 함수
    """
    print(f"📢 M4A 파일 변환 중: {m4a_path}")

    # 🔹 M4A 파일 로드
    audio = AudioSegment.from_file(m4a_path, format="m4a")

    # 🔹 변환: 16kHz, Mono, 16-bit PCM
    audio = audio.set_frame_rate(16000).set_channels(1).set_sample_width(2)  # 2 bytes = 16-bit PCM

    # 🔹 변환된 WAV 저장
    wav_path = m4a_path.replace(".m4a", ".wav")
    audio.export(wav_path, format="wav")

    print(f"✅ 변환 완료: {wav_path}")
    return wav_path

# 📌 오디오 파일 처리
# async def process_audio(file_path):
#     """
#     Pyannote로 화자를 먼저 분리한 후,
#     Whisper를 사용하여 각 화자의 음성을 개별적으로 텍스트 변환하는 함수
#     """
#     print("📢 Pyannote로 화자 분리 중...")

#     # ✅ 오디오 파일을 미리 로드하여 처리 속도 향상
#     waveform, sample_rate = torchaudio.load(file_path)

#     # ✅ Pyannote Speaker Diarization 실행
#     diarization = pipeline(
#         {"waveform": waveform, "sample_rate": sample_rate},
#         min_speakers=1,  # 최소 화자 수
#         max_speakers=3   # 최대 화자 수
#     )

#     # ✅ Whisper 모델 로드
#     model = whisper.load_model("medium").to(device)

#     # ✅ Whisper로 전체 오디오 변환 (구간별 변환 포함)
#     print("📢 Whisper로 음성 변환 중...")
#     result = model.transcribe(file_path, word_timestamps=True)

#     # ✅ Whisper의 변환된 구간별 데이터 저장
#     whisper_segments = [
#         {
#             "start": segment["start"],
#             "end": segment["end"],
#             "text": segment["text"]
#         }
#         for segment in result["segments"]
#     ]

#     # ✅ Pyannote 결과와 Whisper 결과 매칭
#     final_output = []
#     for whisper_segment in whisper_segments:
#         start_time, end_time = whisper_segment["start"], whisper_segment["end"]
#         matched_speaker = None

#         # Pyannote의 화자 정보와 시간 범위 비교하여 매칭
#         for segment, _, speaker in diarization.itertracks(yield_label=True):
#             if segment.start <= start_time <= segment.end or segment.start <= end_time <= segment.end:
#                 matched_speaker = speaker
#                 break

#         final_output.append({
#             "speaker": matched_speaker if matched_speaker else "UNKNOWN",
#             "text": whisper_segment["text"],
#             "start_time": round(start_time, 2),
#             "end_time": round(end_time, 2)
#         })

#     print(f'📢 화자 분리 + Whisper 변환 결과:\n{json.dumps(final_output, indent=4, ensure_ascii=False)}')
#     # print("화자 분리 완료, STT 완료")
#     return analyze_with_gpt(final_output)
async def process_audio(file_path):
    """
    Pyannote로 화자를 먼저 분리한 후,
    Whisper를 사용하여 각 화자의 음성을 개별적으로 텍스트 변환하는 함수
    """
    print("📢 Pyannote로 화자 분리 중...")

    try:
        # ✅ 오디오 파일을 미리 로드하여 처리 속도 향상
        waveform, sample_rate = torchaudio.load(file_path)

        # ✅ Pyannote Speaker Diarization 실행
        diarization = pipeline(
            {"waveform": waveform, "sample_rate": sample_rate},
            min_speakers=1,  # 최소 화자 수
            max_speakers=3   # 최대 화자 수
        )

        # ✅ Whisper 모델 로드
        model = whisper.load_model("medium").to(device)

        # ✅ Whisper로 전체 오디오 변환 (구간별 변환 포함)
        print("📢 Whisper로 음성 변환 중...")
        result = model.transcribe(file_path, word_timestamps=True)

        if not result or "segments" not in result:
            print("❌ Whisper 변환 실패")
            return "FAILED"  # ✅ None 대신 "FAILED" 반환

        whisper_segments = [
            {
                "start": segment["start"],
                "end": segment["end"],
                "text": segment["text"]
            }
            for segment in result["segments"]
        ]

        final_output = analyze_with_gpt(whisper_segments)  # ✅ GPT 분석 실행

        if not final_output:
            print("❌ GPT 분석 실패")
            return "FAILED"

        return final_output  # ✅ 올바른 결과 반환

    except Exception as e:
        print(f"❌ STT 분석 중 오류 발생: {e}")
        return "FAILED"  # ✅ 예외 발생 시 "FAILED" 반환
    

# 📌 AI 분석: 상담 내용 요약 및 정리
def analyze_with_gpt(text_data):
    """
    AI (GPT-4o-mini)를 이용해 상담 내용을 분석하고 요약하는 함수
    """
    print("📢 AI 분석 진행 중...")

    prompt = f"""
        다음 웨딩홀 상담 내용을 분석하여, 표 형식으로 정리해줘.
        
        1. 상담 내용을 간략히 요약하고, 어떤 상황인지 설명해.
        2. 주요 항목을 정리하여 JSON 형식으로 출력해.
        3. 다른 답변은 추가하지 말고, 오직 JSON 형식만 답변에 담아.
        4. 1개의 JSON 객체에는 오직 1개의 날짜와 홀만 존재해야 해. 
        5. 만약 상담 내용에 여러 날짜와 여러 홀이 존재한다면, 모두 각각의 JSON 객체로 작성해 여러 개의 JSON 객체로 답변해. 
        6. JSON 필드는 아래 형식을 따를 것:
        
        ```json
        {{
            "날짜": "25/03/22 14:00",
            "업체명": "웨스턴베니비스",
            "홀명" : "그랜드볼륨",
            "위치": "서울 강남구",
            "가능 날짜": "2026년 2월 28일 불가능", 
            "홀_유형": "커티지홀",
            "최대인원": "300명"
            "대관료": "200만 원",
            "예식_방식": "단독홀",
            "식사_형태": "뷔페",
            "1인당_식사_비용": "5만원",
            "최소_보장_인원": "200명",
            "포함_서비스": ["플라워 장식", "조명 연출"],
            "계약금": "50만 원",
            "환불_규정": "1개월 전 100% 환불, 2주 전 50% 환불",
            "기타사항" : ["주차 100대 무료", "평일 예식 10% 할인","3개월 내 계약시 대관료 10% 할인인"],
            }},
            {{
            "날짜": "25/03/24 15:00",
            "업체명": "웨스턴베니비스",
            "홀명" : "르미엘웨딩홀홀",
            "위치": "서울 강남구",
            "가능 날짜": "2026년 2월 27일 가능", 
            "홀_유형": "챔플플홀",
            "최대인원": "240명"
            "대관료": "1500만 원",
            "예식_방식": "단독홀",
            "식사_형태": "뷔페",
            "1인당_식사_비용": "5만원원",
            "최소_보장_인원": "100명",
            "포함_서비스": ["플라워 장식", "피아노 4중주","사회자"],
            "계약금": "30만 원",
            "환불_규정": "1개월 전 100% 환불, 2주 전 50% 환불",
            "기타사항" : ["주차 100대 무료", "평일 예식 10% 할인","3개월 내 계약시 대관료 10% 할인인"],
        }}
        ```

        4. 상담 내용에서 해당 정보가 누락된 경우, "정보 없음"으로 표기해.
        5. 데이터 분석을 위해 깔끔한 JSON 형식으로 출력해.

        --- 상담 내용 ---
        
        {text_data}
    """

    client = openai.Client(api_key=OPENAI_API_KEY)

    for attempt in range(5):
        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "너는 웨딩 상담 내용을 정리하는 AI야."},
                    {"role": "user", "content": prompt}
                ]
            )

            if response and response.choices:
                return response.choices[0].message.content
            else:
                print("❌ OpenAI API 응답이 비어 있습니다.")
                return None

        except openai.RateLimitError:
            wait_time = (2 ** attempt)  # 2, 4, 8, 16초 대기
            print(f"⚠️ OpenAI 요청 제한 초과. {wait_time}초 후 재시도...")
            time.sleep(wait_time)

    print("❌ 5회 재시도 후에도 실패. API 사용량을 확인하세요.")
    return None

# ##################테스트###################
# @app.post("/predict")
# def summarize_audio_request(data: dict):
#     analysis_result = analyze_with_gpt("안녕하세요요")
#     audio_summary_id = data.get("audio_summary_id")
#     send_to_backend(audio_summary_id, analysis_result, "SUCCESS")



@app.post("/predict")
async def summarize_audio_request(data: dict, background_tasks: BackgroundTasks):
    file_url = data.get("file_url")
    # request_id = str(uuid.uuid4())  # 고유한 요청 ID 생성
    audio_summary_id = data.get("audio_summary_id")

    if not file_url:
        raise HTTPException(status_code=400, detail="파일 URL이 제공되지 않았습니다.")
    
    print(f"📢 S3에서 파일 다운로드 중: {file_url}")

    # ✅ 1. S3에서 다운로드하여 로컬 파일로 저장
    local_file_path = await download_from_s3(file_url)

    # ✅ 2. 변환 (M4A → WAV)
    converted_file = ensure_wav_format(local_file_path)
        
    if not converted_file:
        return {"status": "ERROR", "message": "파일 변환 실패"}
    
     # ✅ 3. STT 분석을 백그라운드에서 실행
    background_tasks.add_task(process_and_send_result, converted_file,audio_summary_id)

    return {"status": "PROCESSING", "message": "파일이 처리 중입니다. 나중에 결과를 확인하세요."}  
    # return(process_file(converted_file))  # 변환된 WAV 파일로 실행

# ✅ STT 분석 & 백엔드 전송 (비동기)
async def process_and_send_result(file_path, audio_summary_id):
    """STT 변환 후 결과를 백엔드로 전송하는 비동기 함수"""
    analysis_result = await process_audio(file_path)

    # if analysis_result:
    #     await send_to_backend(audio_summary_id, analysis_result, "COMPLETED")
    # else:
    #     print(f"❌ STT 변환 실패: {audio_summary_id}")
    #     await send_to_backend(audio_summary_id,"" ,"FAILED")
    # ✅ None 방지: analysis_result가 "FAILED"인 경우 빈 문자열로 설정
    if not analysis_result or analysis_result == "FAILED":
        print(f"❌ STT 변환 실패: {audio_summary_id}")
        analysis_result = ""

    # ✅ send_to_backend()는 항상 유효한 값 전달
    await send_to_backend(audio_summary_id, analysis_result, "COMPLETED" if analysis_result else "FAILED")


# ✅ 백엔드로 결과 전송 (비동기)
async def send_to_backend(audio_summary_id, analysis_result, status):
    """Spring Boot 백엔드로 분석 결과 전송"""
    # ✅ None 방지: 빈 문자열로 대체
    if analysis_result is None:
        analysis_result = ""

    payload = {"audioSummaryId": audio_summary_id, "summaryResult": analysis_result, "status": status}
    response = requests.patch(BACKEND_API_URL, json=payload)
    
    print(f"📢 백엔드 응답 코드: {response.status_code}, 응답: {response.text}")
    if response.status_code == 200:
        print(f"✅ [백엔드 전송 완료] 요청 ID: {audio_summary_id}")
    else:
        print(f"❌ [백엔드 응답 오류] 요청 ID: {audio_summary_id}, 오류: {response.text}")