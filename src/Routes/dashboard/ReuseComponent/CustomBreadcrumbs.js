import React from 'react';

const CustomBreadcrumbs = ({ currentPage, data }) => {
  return (
    <ul className="breadcrumb">
      {data?.map((item, index) => (
        <li key={index}>
          <a href={item.url}>{item.name}</a>
          {index < data.length - 1 && <span> / </span>}
        </li>
      ))}
      <li>{currentPage}</li>
    </ul>
  );
};

export default CustomBreadcrumbs;
