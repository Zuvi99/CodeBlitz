package com.adedoyin.codesculpt.service.executor;


import com.adedoyin.codesculpt.service.executor.piston_self_host.SelfHostExecutionService;
import com.adedoyin.codesculpt.service.executor.piston.PistonExecutionService;
import com.adedoyin.codesculpt.service.executor.piston.PistonResponse;
import com.adedoyin.codesculpt.service.executor.piston_self_host.SelfHostResponse;
import reactor.core.publisher.Mono;

public class ExecutionServiceImpl implements ExecutionService {

    private final PistonExecutionService pistonExecutionService;

    private final SelfHostExecutionService selfHostExecutionService;

    public ExecutionServiceImpl(PistonExecutionService pistonExecutionService, SelfHostExecutionService selfHostExecutionService) {
        this.pistonExecutionService = pistonExecutionService;
        this.selfHostExecutionService = selfHostExecutionService;
    }




    @Override
    public Mono<CodeExecutionResponse> executeCode(CodeExecutionData codeExecutionData) {
      return  switch (codeExecutionData.executor()) {
          case SELFHOSTED -> this.selfHostExecutionService.execute(codeExecutionData.toPistonServer()).map(SelfHostResponse::toResponse);
          case PUBLIC -> this.pistonExecutionService.execute(codeExecutionData.toPiston()).map(PistonResponse::toResponse);
        };
    }
}
