package com.example.ordermicroservice.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.PublishRequest;

@Service
public class NotificationPublisher {

    @Value("${aws.sns.order-topic-arn}")
    private String topicArn;

    private final SnsClient snsClient = SnsClient.builder()
            .region(Region.US_EAST_1)
            .build();

    public void publishOrderNotification(Long orderId, String customerEmail) {
        String message = String.format(
                "{\n" +
                "    \"orderId\": %d,\n" +
                "    \"customerEmail\": \"%s\"\n" +
                "}",
                orderId,
                customerEmail
        );
        PublishRequest request = PublishRequest.builder()
                        .topicArn(topicArn)
                                .message(message)
                                        .build();


        snsClient.publish(request);
    }
}
