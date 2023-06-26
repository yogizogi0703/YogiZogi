import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';
import { RecoilRoot } from 'recoil';
import React from 'react';
import App from './App';
import { worker } from './mocks/worker';
import KakaoMapScriptLoader from './components/map/KakaoMapScriptLoader';
import Modal from './components/common/Modal';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <RecoilRoot>
    <KakaoMapScriptLoader>
      <React.Suspense fallback={<div>Loading...</div>}>
        <App />
      </React.Suspense>
    </KakaoMapScriptLoader>
  </RecoilRoot>
);
