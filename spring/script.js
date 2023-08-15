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
                {target: 1000, duration: '1m'}
            ],
            startVUs: 1000,
            gracefulRampDown: '15s',
            exec: 'scenario_2',
        },
    },
}

export function scenario_2() {
    let response

    // app-test
    response = http.post(
        'https://spring-mvc-vizuwgtgsa-uc.a.run.app/api/execute',
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