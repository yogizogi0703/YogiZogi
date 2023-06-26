import '@testing-library/jest-dom/dist/extend-expect';
import '@testing-library/jest-dom';
import { server } from './server';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
