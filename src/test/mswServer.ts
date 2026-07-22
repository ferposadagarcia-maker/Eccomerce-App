import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const server = setupServer(
    http.post('*/api/get-presigned-url', () => {
        return HttpResponse.json({
            uploadUrl: 'https://mock-s3-upload-url.com',
            publicUrl: 'https://mock-bucket.s3.amazonaws.com/joya.jpg',
        });
    }),
    http.put('https://mock-s3-upload-url.com', () => {
        return new HttpResponse(null, { status: 200 });
    })
);