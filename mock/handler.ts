import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/items', (info) => {
    if (info.request.headers.get('X-Error') === 'true') {
      return HttpResponse.error();
    }

    return HttpResponse.json({
      name: 'Mike',
      age: 30,
      job: 'engineer',
    });
  }),
];