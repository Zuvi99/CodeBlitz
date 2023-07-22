package com.adedoyin.codesculpt.service.executor;


import com.adedoyin.codesculpt.service.executor.judge0.JudgeExecutionService;
import com.adedoyin.codesculpt.service.executor.judge0.JudgeResponse;
import com.adedoyin.codesculpt.service.executor.piston.PistonExecutionService;
import com.adedoyin.codesculpt.service.executor.piston.PistonResponse;
import reactor.core.publisher.Mono;

public class ExecutionServiceImpl implements ExecutionService {

    private PistonExecutionService pistonExecutionService;

    private JudgeExecutionService judgeExecutionService;

    public ExecutionServiceImpl(PistonExecutionService pistonExecutionService, JudgeExecutionService judgeExecutionService) {
        this.pistonExecutionService = pistonExecutionService;
        this.judgeExecutionService = judgeExecutionService;

    }




    @Override
    public Mono<CodeExecutionResponse> executeCode(CodeExecutionData codeExecutionData) {
      return  switch (codeExecutionData.executor()) {
            case JUDGE -> this.judgeExecutionService.execute(codeExecutionData.toJudge()).map(JudgeResponse.Submission::toResponse);
            case PISTON -> this.pistonExecutionService.execute(codeExecutionData.toPiston()).map(PistonResponse::toResponse);
        };
    }
}
