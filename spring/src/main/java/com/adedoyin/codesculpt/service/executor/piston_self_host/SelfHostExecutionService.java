package com.adedoyin.codesculpt.service.executor.piston_self_host;

import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

public class SelfHostExecutionService {

    private final WebClient webClient;

    public SelfHostExecutionService(String pistonServerUrl) {
        this.webClient = WebClient.builder().baseUrl(pistonServerUrl).build();
    }

    public Mono<SelfHostResponse> execute(SelfHostExecutionData data) {
        return this.webClient.post().uri("/execute").body(Mono.just(data), SelfHostExecutionData.class).retrieve().bodyToMono(SelfHostResponse.class);
    }
}
