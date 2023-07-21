package com.adedoyin.codesculpt.service.executor;

import org.springframework.stereotype.Service;

@Service
public class ExecutorServiceImpl implements ExecutorService {
    @Override
    public void executeCode(CodeExecutionData codeExecutionData) {
        switch (codeExecutionData.executor()) {
            case JUDGE -> {
            }
            case PISTON -> {
            }
        }
    }
}
