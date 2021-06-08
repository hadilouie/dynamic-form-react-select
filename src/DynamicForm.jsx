import React, { useState, useEffect } from "react";
import Select from "react-select";

export const DynamicForm = () => {
	const [inputList, setInputList] = useState([
		{
			country: { _id: "", countryName: "" },
			city_1: "",
			city_2: "",
			city_3: "",
			city_4: "",
		},
	]);
	const [options, setOptions] = useState([]);

	// handle input change
	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...inputList];
		list[index][name] = value;
		setInputList(list);
	};

	const handleSelectChange = (e, index) => {
		const list = [...inputList];
		list[index].country._id = e.value;
		list[index].country.countryName = e.label;
		setInputList(list);
	};
	// handle click event of the Remove button
	const handleRemoveClick = (index) => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([
			...inputList,
			{
				country: { _id: "", countryName: "" },
				city_1: "",
				city_2: "",
				city_3: "",
				city_4: "",
			},
		]);
	};

	const getCountry = () => {
		const dataSelect = [
			{ value: "1", label: "Germany" },
			{ value: "2", label: "Iran" },
			{ value: "3", label: "India" },
			{ value: "4", label: "Japan" },
			{ value: "5", label: "Italy" },
		];

		setOptions(dataSelect);
	};

	useEffect(() => {
		getCountry();
	}, []);
	return (
		<div className="container mt-4">
			<form onSubmit={(e) => e.preventDefault()}>
				{inputList.map((x, i) => {
					const countryOption = {
						value: x.country._id,
						label: x.country.countryName,
					};
					return (
						<React.Fragment>
							<div className="row">
								<div className="col-6">
									<Select
										name="country"
										id="country"
										value={countryOption}
										onChange={(e) => handleSelectChange(e, i)}
										options={options}
									/>
								</div>
							</div>
							<div className="row mt-2">
								<div className="col-3">
									<input
										type="text"
										className="form-control"
										name="city_1"
										placeholder="City Name"
										value={x.city_1}
										onChange={(e) => handleInputChange(e, i)}
									/>
								</div>
								<div className="col-3">
									<input
										type="text"
										className="form-control"
										name="city_2"
										placeholder="City Name"
										value={x.city_2}
										onChange={(e) => handleInputChange(e, i)}
									/>
								</div>
								<div className="col-3">
									<input
										type="text"
										className="form-control"
										name="city_3"
										placeholder="City Name"
										value={x.city_3}
										onChange={(e) => handleInputChange(e, i)}
									/>
								</div>
								<div className="col-3">
									<input
										type="text"
										className="form-control"
										name="city_4"
										placeholder="City Name"
										value={x.city_4}
										onChange={(e) => handleInputChange(e, i)}
									/>
								</div>
							</div>

							<div className="row mt-2">
								<div className="col-4 mb-2">
									{inputList.length !== 1 && (
										<button
											className="btn btn-danger "
											onClick={() => handleRemoveClick(i)}
										>
											Remove
										</button>
									)}
									{inputList.length - 1 === i && (
										<button
											className="btn btn-primary ms-2"
											onClick={handleAddClick}
										>
											Add
										</button>
									)}
								</div>
							</div>
						</React.Fragment>
					);
				})}
				<div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
			</form>
		</div>
	);
};
