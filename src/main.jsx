import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router';
import SearchPage from './components/SearchPage.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<HashRouter>
			<Routes>
				<Route path='/' element={<SearchPage />} />
				<Route path='/invite' element={<App />} />
			</Routes>
		</HashRouter>
	</StrictMode>
);
