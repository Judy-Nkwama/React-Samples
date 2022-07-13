import React from 'react';

const Pagination = props => {
  return (
    <nav aria-label="products pagination">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;&laquo;</span>
          </a>
        </li>
        <li className="page-item"><a className="page-link" href="#">&laquo;</a></li>
        <li className="page-item"><a className="page-link" href="#">1</a></li>
        <li className="page-item"><a className="page-link" href="#">&raquo;</a></li>
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;