package com.adedoyin.codesculpt.service.executor;


import com.adedoyin.codesculpt.service.executor.piston.PistonExecutionService;

public class ExecutionServiceImpl implements ExecutionService {

    private final PistonExecutionService pistonExecutionService;

    public ExecutionServiceImpl(PistonExecutionService pistonExecutionService) {
        this.pistonExecutionService = pistonExecutionService;
    }

    @Override
    public void executeCode(CodeExecutionData codeExecutionData) {
        switch (codeExecutionData.executor()) {
            case JUDGE -> {
            }
            case PISTON -> {
                this.pistonExecutionService.execute(codeExecutionData.toPiston()).subscribe(System.out::println);
            }
        }
    }
}
