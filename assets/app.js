/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';

import React , { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

function App(){
	const defaultField = {
		value: "",
		currency: "1"
	};
	const [currencies, setCurrencies] = useState();
	const [result, setResult] = useState();
	
	useEffect(() => {
		getCurrencies();
	}, []);

	const schema =  Yup.object().shape({
		fields: Yup.array()
					.of(
						Yup.object().shape({
							value: Yup.number().required('Required'),
							currency: Yup.number().integer().required('Required')
						})
					)
					.required('Must have values')
					.min(2, 'Minimum of 2 values'),
		});

	const getCurrencies = () => {
		axios.get('/api/currencies')
				.then(res => {
					setCurrencies(res.data.currencies);
					// init the materialize selects
					var elems = document.querySelectorAll('select');
					M.FormSelect.init(elems);
				})
	}

	const submitForm = (values) => {
		axios.post('/api/calculate', values)
				.then(res => {
					if(res.data.status == "success"){
						setResult(res.data.data);
					}else{
						M.toast({html: res.data.error, classes: "pink"});
					}
				})
	}


	return (<div className="container" >
				<h1>Calculator</h1>
				<Formik
					initialValues={{fields: [
						defaultField,
						defaultField
					]}}
					enableReinitialize
					validationSchema={schema}
					onSubmit={(values, { setSubmitting }) => {
						submitForm(values);
						setSubmitting(false);
					}}>
					{({values, errors, touched}) => {
						useEffect(() => {
							// init the materialize selects	when input is added
							var elems = document.querySelectorAll('select');
							M.FormSelect.init(elems);
						}, [values.fields.length]);

						return (
							<Form>
								<FieldArray name="fields">
								 	{({remove, push}) => {

									return (
										<div className="center-align">
											{values.fields.map((field, index) => (
												<div className="row" key={index}>
													<div className="input-field col s8">
														<Field id={"value_" + index} type="number" name={`fields[${index}].value`} 
															className={touched.fields && touched.fields[index] && errors.fields  && errors.fields[index] ? "invalid" : ""}/>
														<label htmlFor={"value_" + index}>Value</label>
													</div>
													<div className="input-field col s2">

														<Field id={"currency_" + index} as="select" name={`fields[${index}].currency`}>
															{currencies && currencies.map((currency) => (<option key={currency.id} value={currency.id}>{currency.symbol}</option>))}
														</Field>
													</div>
													{/*<div className="col s2">
																											<button className="waves-effect waves-light btn btn-floating pink" type="button" onClick={() => remove(index)}>
																												<i className="material-icons">remove</i>
																											</button>
																										</div>*/}
												</div>
											))}

											{/*<button className="waves-effect waves-light btn btn-floating lime" type="button" onClick={() => push(defaultField)} >
																							<i className="material-icons">add</i>
																						</button>*/}

											{typeof errors.fields === 'string' ? <div className="pink-text">{errors.fields}</div> : null}
										</div>
									)

									}}
								</FieldArray>

								<button className="waves-effect waves-light btn cyan" type="submit">
									Compute
								</button>
							</Form>)}}
				 </Formik>
				 <div className="container result">
				 	<h4>
				 		{result}
				 	</h4>
				 </div>
			</div>)
}

ReactDOM.render(<App/>, document.getElementById('root'));