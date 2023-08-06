package com.adedoyin.codesculpt.service.executor.judge0;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

public class JudgeExecutionService {

    private final WebClient webClient;

    public JudgeExecutionService(String judgeServerUrl) {
        this.webClient = WebClient.builder().baseUrl(judgeServerUrl).build();
    }

    public Mono<JudgeResponse> execute(JudgeExecutionData data) {
        return this.webClient.post().uri("/submissions?base64_encoded=false&wait=true").body(Mono.just(data),
                JudgeExecutionData.class).retrieve().bodyToMono(JudgeResponse.class);
    }
}
