/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SponsorPage from './pages/SponsorPage';
import SpeakerPage from './pages/SpeakerPage';
import StorePage from './pages/StorePage';
import { CartProvider } from './context/CartContext';

export default function AppRoutes() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sponsor" element={<SponsorPage />} />
        <Route path="/speaker" element={<SpeakerPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CartProvider>
  );
}
