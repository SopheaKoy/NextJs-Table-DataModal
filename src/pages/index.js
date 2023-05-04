
import NavBarComponent from '../components/NavBarComponent';
import FooterComponent from '../components/FooterComponent';
import DataTable from 'react-data-table-component';
import React, { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';


export default function index() {
	const [products, setProducts] = useState([]);
	const [filterText, setFilterText] = useState('');
	const [restPaginations, setRestPagination] = useState(false);
	const filteredItems = products.filter(
		(item) => item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
	);
	const columns = [
		{
			name: 'Product Name',
			selector: (row) => row.title,
		},
		{
			name: 'Price',
			selector: (row) => row.price + '$',

		},
		{
			name: 'image',
			selector: (row) => (
				<img
					src={row.images}
					alt={row.title}
					width="90px"
					height="90px"
				/>
			),
		},
		{
			name: 'action',
			selector: (row) => (
				<div>
					<button className="btn btn-primary mr-5 m-2 p-2">Edit</button>
					<button className="btn btn-error btn-dark p-2">Delete</button>
				</div>
			),
		},
	];
	useEffect(() => {
		fetch('https://api.escuelajs.co/api/v1/products')
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);

	const subHeader = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPagination(!resetPaginations);
				setFilterText('');
			}
		};
	}, [filterText, restPaginations]);
	return (
		<>
			<NavBarComponent />
			<h1>Product Collection -Table</h1>
			<input
				onChange={(e) => setFilterText(e.target.value)}
				filterText={filterText}
				type="text"
				placeholder="find all products here"
				className="input input-bordered input-accent w-full max-w-xs text-dark float-end border-3 p-2 m-md-3 "
			/>
			<DataTable
				title="Contact List"
				columns={columns}
				data={filteredItems}
				pagination
				highlightOnHover
				paginationResetDefaultPage={restPaginations}
				subHeader
				subHeader={subHeader}
				selectableRows
				persistTableHead
			/>
			<FooterComponent />
		</>
	);
}
