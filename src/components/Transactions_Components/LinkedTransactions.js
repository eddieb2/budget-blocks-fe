import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DisplayTrans from './DisplayTrans';

import { getTransactions } from '../../redux/actions/PlaidActions';
import { connect } from 'react-redux';
import './index.css';

import { getCategories } from '../../redux/actions/AddTransactionActions';

import AddTransactionModal from '../Modal_Components/AddTransaction';
const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
		}
	},
	container: {
		// display: 'grid',
		// gridTemplateColumns: 'repeat(12, 1fr)'
		display: 'flex',
		width: '100%'
	},
	topcontent: {
		display: 'flex'
	},
	card: {
		width: '100%',
		marginBottom: '1rem',
		height: '70%',
		background: '#f7f7f7',
		textAlign: 'left',
		paddingLeft: '10px',
		display: 'flex',

		fontSize: '12px'
	},
	details: {
		display: 'flex'
	},
	content: {
		flex: '1 0 auto',
		alignItems: 'flex-start',
		textAlign: 'left'
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		textAlign: 'right',
		alignContent: 'flex-end'
	},
	text: {
		textAlign: 'left',
		paddingLeft: theme.spacing(5)
	},
	rightInfo: {
		width: '85%'
	},
	leftInfo: {
		width: '15%',
		// paddingTop: '5%',
		alignItems: 'center'
	}
}));

const Transactions = props => {
	const classes = useStyles();
	const [filter, setFilter] = useState(true);
	const handleClick = e => {
		setFilter(!filter);
	};
	const [category, setCategory] = useState('');

	var selected = props.transactions.slice(0, 3);
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			{filter ? (
				<React.Fragment>
					<div className='trans-container'>
						<div className='trans-top-content'>
							<h3 className={classes.text}>Recent Transactions:</h3>
							<button className='add-trans-button' onClick={handleClickOpen}>
								Add Transactions
							</button>
							<AddTransactionModal open={open} handleClose={handleClose} />
						</div>
						<div className='trans-item'>
							<DisplayTrans arr={selected} classes={classes} />
						</div>

						<button id='view-button' onClick={handleClick}>
							View all transactions
						</button>
					</div>
				</React.Fragment>
			) : (
				<React.Fragment>
					<div className='trans-container'>
						<div className='trans-top-content'>
							<h3 className={classes.text}>Recent Transactions:</h3>
							<button className='add-trans-button'>Add Transactions</button>
						</div>
						<div className='trans-item'>
							<DisplayTrans arr={props.transactions} classes={classes} />
						</div>
						<button id='view-button' onClick={handleClick}>
							View less
						</button>
					</div>
				</React.Fragment>
			)}
		</div>
	);
};
function mapStateToProps(state) {
	return {
		userID: state.loginReducer.user.id,
		LinkedAccount: state.loginReducer.user.LinkedAccount,
		transactions: state.plaidReducer.transactions
	};
}

export default connect(mapStateToProps, { getTransactions })(Transactions);