package com.adedoyin.codesculpt.config;

import com.adedoyin.codesculpt.service.executor.ExecutionService;
import com.adedoyin.codesculpt.service.executor.ExecutionServiceImpl;
import com.adedoyin.codesculpt.service.executor.piston_self_host.SelfHostExecutionService;
import com.adedoyin.codesculpt.service.executor.piston.PistonExecutionService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CodesculptConfig {

    @Value("${piston.api.url}")
    private String pistonAPIUrl;

    @Value(("${piston.server.url}"))
    private String pistonServerUrl;

    @Bean
    public ExecutionService executorService() {
        return new ExecutionServiceImpl(new PistonExecutionService(this.pistonAPIUrl),
                new SelfHostExecutionService(this.pistonServerUrl));
    }
}
