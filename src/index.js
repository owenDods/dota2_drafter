import React from 'react';
import ReactDOM from 'react-dom';
import heroData from '../data/heroes.json';
import DrafterApp from './components/DrafterApp';

ReactDOM.render(
	<DrafterApp data={heroData.result.heroes} />,
	document.getElementById('drafterApp')
);
