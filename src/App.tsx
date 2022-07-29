import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainView from './pages/MainView';
import SpellSpecsView from './pages/SpellSpecsView';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<MainView />} />
					<Route path="/spells/:id" element={<SpellSpecsView />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
