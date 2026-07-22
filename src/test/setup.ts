import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './mswServer';
import { vi } from 'vitest';

vi.mock('firebase/firestore', () => ({
    getFirestore: vi.fn(),
    collection: vi.fn(),
    doc: vi.fn(),
    addDoc: vi.fn(() => Promise.resolve({ id: 'mock-order-123' })),
    setDoc: vi.fn(),
    serverTimestamp: vi.fn(() => 'mock-timestamp'),
    increment: vi.fn((val) => val),
    writeBatch: vi.fn(() => ({
        set: vi.fn(),
        update: vi.fn(),
        commit: vi.fn(),
    })),

    Timestamp: {
        now: () => ({
            toDate: () => new Date(),
            seconds: Math.floor(Date.now() / 1000),
            nanoseconds: 0,
        }),
        fromDate: (date: Date) => ({
            toDate: () => date,
            seconds: Math.floor(date.getTime() / 1000),
            nanoseconds: 0,
        }),
    },
}));

beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});