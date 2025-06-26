import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import SearchPage from './components/SearchPage.jsx';
import BackgroundMusic from './components/BackgroundMusic.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BackgroundMusic />
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SearchPage />} />
				<Route path='/invite' element={<App />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
