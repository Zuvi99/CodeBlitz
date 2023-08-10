package com.adedoyin.codesculpt.service.executor.piston;

import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

public class PistonExecutionService {

    private final WebClient webClient;

    public PistonExecutionService(String pistonAPIUrl) {
        this.webClient = WebClient.builder().baseUrl(pistonAPIUrl).build();
    }

    public Mono<PistonResponse> execute(PistonExecutionData data) {
        return this.webClient.post().uri("/execute").body(Mono.just(data), PistonExecutionData.class).retrieve().bodyToMono(PistonResponse.class);
    }
}
