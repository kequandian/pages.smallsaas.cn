import React, { Fragment } from 'react';
import MiniCard from '../components/MiniCard';
const TestMiniCard = (props) => {
	const data = [
		{
			title: '总人数',
			value: 16,
		}
	];
	return (
		<Fragment>
			<MiniCard
				data={ data }
			/>
		</Fragment>
	);
}
export default TestMiniCard;