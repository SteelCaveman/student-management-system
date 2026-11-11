
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    student_api_load: {
      executor: 'constant-vus',
      vus: 500,
      duration: '60s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.05'],
  },
};

export default function () {
  const response = http.get('http://localhost:8081/api/students');

  check(response, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}