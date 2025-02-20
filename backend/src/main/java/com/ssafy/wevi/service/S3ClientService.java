package com.ssafy.wevi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3ClientService {

    private final S3Client s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String upload(MultipartFile multipartFile) throws IOException {

        String randomName = UUID.randomUUID().toString();

        String dirName = "audio"; // 이미지 폴더에 저장하기 위해 경로를 지정했다.
        String fileName = dirName + "/" + randomName;

        PutObjectRequest putObjectRequest = PutObjectRequest.builder() // put 요청을 하기 위한 request
                .bucket(bucket)
                .key(fileName)
                .contentType(multipartFile.getContentType())
                .contentLength(multipartFile.getSize())
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(multipartFile.getBytes()));// s3에 업로드

        GetUrlRequest request = GetUrlRequest.builder().bucket(bucket).key(fileName).build(); // s3에서 주소를 받아오기 위한 request

        return s3Client.utilities().getUrl(request).toString(); // 업로드된 파일 주소 리턴
    }
}