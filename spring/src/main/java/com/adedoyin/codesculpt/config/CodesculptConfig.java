package com.adedoyin.codesculpt.config;

import com.adedoyin.codesculpt.service.executor.ExecutionService;
import com.adedoyin.codesculpt.service.executor.ExecutionServiceImpl;
import com.adedoyin.codesculpt.service.executor.piston_self_host.SelfHostExecutionService;
import com.adedoyin.codesculpt.service.executor.piston.PistonExecutionService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CodesculptConfig {
    @Bean
    public ExecutionService executorService() {
        return new ExecutionServiceImpl(new PistonExecutionService(),
                new SelfHostExecutionService());
    }
}
