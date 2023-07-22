package com.adedoyin.codesculpt.service.executor;


import com.adedoyin.codesculpt.service.executor.judge0.JudgeExecutionService;
import com.adedoyin.codesculpt.service.executor.piston.PistonExecutionService;

public class ExecutionServiceImpl implements ExecutionService {

    private PistonExecutionService pistonExecutionService;

    public ExecutionServiceImpl(PistonExecutionService pistonExecutionService) {
        this.pistonExecutionService = pistonExecutionService;
    }

    private JudgeExecutionService judgeExecutionService;

    public ExecutionServiceImpl(JudgeExecutionService judgeExecutionService) {
        this.judgeExecutionService = judgeExecutionService;
    }

    @Override
    public void executeCode(CodeExecutionData codeExecutionData) {
        switch (codeExecutionData.executor()) {
            case JUDGE -> this.judgeExecutionService.execute(codeExecutionData.toJudge()).subscribe(System.out::println);
            case PISTON -> this.pistonExecutionService.execute(codeExecutionData.toPiston()).subscribe(System.out::println);
        }
    }
}
