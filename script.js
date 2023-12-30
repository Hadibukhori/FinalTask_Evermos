import http from 'k6/http';
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";


export default function () {
    const url = 'https://reqres.in/api/users';
    const payload = JSON.stringify({
         name: 'morpheus',
         job: 'leader'
  
    });

    const headers = { 'Content-Type': 'application/json' };
    const res = http.post(url, payload, { headers });
    check(res, {
        'Status code is 201': (r) => r.status === 201,

  });

    const url2 = 'https://reqres.in/api/users/2';
    const payload2 = JSON.stringify({
         name: 'morpheus',
         job: 'zion resident',
  
    });

    const headers2 = { 'Content-Type': 'application/json' };
    const res2 = http.put(url2, payload2, { headers2 });
    check(res2, {
        'Status code is 200': (r2) => r2.status === 200,

  });
}

export const options = {
    scenarios: {
      shared_iter_scenarios: {
        executor: "shared-iterations",
        vus: 500,
        iterations: 500,
        startTime: "0s",
      },
      per_vu_scenarios: {
        executor: "per-vu-iterations",
        vus: 500,
        iterations: 6,
        startTime: '2s',
      },
    },
  };

export function handleSummary(data) {
    return {
        "script-result.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}

