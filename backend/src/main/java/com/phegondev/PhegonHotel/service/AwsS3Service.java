package com.phegondev.PhegonHotel.service;


import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.phegondev.PhegonHotel.exception.OurException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
@Service
public class AwsS3Service {
    private final String bucketName = "aws.image.store.2025";

    @Value("${aws.s3.access.key}")
    private String awsS3AccessKey;

    @Value("${aws.s3.secret.key}")
    private String awsS3SecretKey;

    public String saveImageToS3(MultipartFile photo) throws IOException {
        try {
            String s3Filename = photo.getOriginalFilename();
            System.out.println("Uploading file: " + s3Filename);

            BasicAWSCredentials awsCredentials = new BasicAWSCredentials(awsS3AccessKey, awsS3SecretKey);
            AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                    .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                    .withRegion(Regions.EU_NORTH_1)
                    .build();

            InputStream inputStream = photo.getInputStream();

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(photo.getContentType());
            metadata.setContentLength(photo.getSize());

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, s3Filename, inputStream, metadata);
            s3Client.putObject(putObjectRequest);


            return "https://"+"s3.eu-north-1.amazonaws.com/"+ bucketName +"/"+ s3Filename;

        } catch (Exception e) {
            e.printStackTrace();
            throw new IOException("Unable to upload image to S3 bucket: " + e.getMessage());
        }
    }
}
















