import { sleep } from 'k6'
import http from 'k6/http'

export const options = {
    ext: {
        loadimpact: {
            distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
            apm: [],
        },
    },
    thresholds: {},
    scenarios: {
        Scenario_2: {
            executor: 'ramping-vus',
            gracefulStop: '30s',
            stages: [
                // { target: 50, duration: '1m'},
                // {target: 70, duration: '1m'},
                // {target: 100, duration: '1m'},
                {target: 100, duration: '20s'}
            ],
            startVUs: 100,
            gracefulRampDown: '15s',
            exec: 'scenario_2',
        },
    },
}

export function scenario_2() {
    let response

    // app-test
    response = http.post(
        'http://localhost:8080/api/execute',
        '{"language":"PYTHON","sourceCode":"print(\'Hello\')","executor":"SELFHOSTED"}',
        {
            headers: {
                'content-type': 'application/json',
            },
        }
    )

    // Automatically added sleep
    sleep(1)
}