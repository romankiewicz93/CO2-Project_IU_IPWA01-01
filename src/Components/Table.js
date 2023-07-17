import React, {useState} from "react";
import './Table.css';
import data from "./Data";

const ExampleTable = () => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({column: "company", order: "asc"});
    const [companyFilter, setCompanyFilter] = useState([]);
    const [countryFilter, setCountryFilter] = useState([]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSort = (column) => {
        const order =
            sort.column === column && sort.order === "asc" ? "desc" : "asc";
        setSort({column, order});
    };

    const handleCompanyFilter = (company) => {
        const newFilter = [...companyFilter];
        const index = newFilter.indexOf(company);

        if (index === -1) {
            newFilter.push(company);
        } else {
            newFilter.splice(index, 1);
        }

        setCompanyFilter(newFilter);
    };

    const handleCountryFilter = (country) => {
        const newFilter = [...countryFilter];
        const index = newFilter.indexOf(country);

        if (index === -1) {
            newFilter.push(country);
        } else {
            newFilter.splice(index, 1);
        }

        setCountryFilter(newFilter);
    };

    const filteredData = data
        .filter((item) => item.company.toLowerCase().includes(search.toLowerCase()))
        .filter((item) => companyFilter.length === 0 || companyFilter.includes(item.company))
        .filter((item) => countryFilter.length === 0 || countryFilter.includes(item.country));

    const sortedData = filteredData.sort((a, b) => {
        const isDesc = sort.order === "desc";
        const aVal = a[sort.column];
        const bVal = b[sort.column];

        if (aVal < bVal) {
            return isDesc ? 1 : -1;
        } else if (aVal > bVal) {
            return isDesc ? -1 : 1;
        } else {
            return 0;
        }
    });

    return (
        <>
            <section id="data-table" className="my-5">
                <div className="container">
                    {/* Table Head Buttons */}
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-search" viewBox="0 0 16 16">
                                      <path
                                          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                </span>
                                <input value={search}
                                       onChange={handleSearchChange} type="text" className="form-control"
                                       placeholder="Search" aria-label="search"
                                       aria-describedby="basic-addon1"/>
                            </div>
                        </div>

                        <div className="col-12 col-sm-8">
                            <div className="button-wrap d-flex gap-4">
                                <div className="dropdown">
                                    <button className="btn btn-info text-white dropdown-toggle" type="button"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                        Filter By Company
                                    </button>
                                    <ul className="dropdown-menu">
                                        {[...new Set(data.map((item) => item.company))].map(
                                            (company) => (
                                                <li key={company} onClick={() => handleCompanyFilter(company)}>
                                                    <qa href="#" className="dropdown-item ps-3 py-1">
                                                        {company} {companyFilter.includes(company) && "✓"}
                                                    </qa>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>

                                <div className="dropdown">
                                    <button className="btn btn-info text-white dropdown-toggle" type="button"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                        Filter By Country
                                    </button>
                                    <ul className="dropdown-menu">
                                        {[...new Set(data.map((item) => item.country))].map(
                                            (country) => (
                                                <li
                                                    key={country}
                                                    onClick={() => handleCountryFilter(country)}
                                                >
                                                    <a href="#" className="dropdown-item">
                                                        {country} {countryFilter.includes(country) && "✓"}
                                                    </a>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="row mt-4 mt-sm-0">
                        <div className="col-12">
                            <table className="table table-bordered table-striped table-hover shadow">
                                <thead>
                                <tr>
                                    <th onClick={() => handleSort("company")}>
                                        Company{" "}
                                        {sort.column === "company" && (sort.order === "asc" ? "▲" : "▼")}
                                    </th>
                                    <th onClick={() => handleSort("country")}>
                                        Country{" "}
                                        {sort.column === "country" && (sort.order === "asc" ? "▲" : "▼")}
                                    </th>
                                    <th>
                                        CO2 Emissions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {sortedData.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.company}</td>
                                        <td>{item.country}</td>
                                        <td>{item.co2Emissions}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ExampleTable;
