import React from "react";
import { Button } from 'reactstrap'

const Pagination = ({ itemPerPage, totalItems, paginate, currentPage }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className="mr-5">
			<ul className="pagination mx-auto" style={{ float: "right" }}>
				{pageNumbers.map(number => (
					<li key={number} className={currentPage === number ? 'page-item active' : 'page-item'} >
						<Button onClick={() => paginate(number)} className="page-link">
							{number}
						</Button>
					</li>
				))}
			</ul>
		</nav>
	)

}


export default Pagination;