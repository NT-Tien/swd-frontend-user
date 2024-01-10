import { useState } from 'react';
import './App.css';
import { Switch } from '@headlessui/react';
import Homepage from './pages/homepage/homepage';

function App() {
	const [enabled, setEnabled ] = useState(true);

	return (
		<>
			<Homepage />
		</>
	);
}

export default App;
