// import { useRef, useState, useEffect } from 'react';
// import { handleOutsideClick } from '../../../utils/handleOutsideClick';
import './DropdownEdit.css';

const DropdownEdit = ({ openModal }) => {
	return (
		<div className="DropdownEdit">
			<button className="edit">Edit</button>
			<button className="delete" onClick={openModal}>
				Delete
			</button>
		</div>
	);
};

export default DropdownEdit;
