import React, { useEffect } from 'react';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import MultipleSelector from '../ui/multiple-selector';

const FormControls = ({ formControls, formData, setFormData }) => {

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const renderFormControl = (formControl) => {
		if (formControl.multiple) {
			return (
				<MultipleSelector
					value={formData[formControl.name]}
					onChange={(selected) => setFormData({ ...formData, [formControl.name]: selected })}
					defaultOptions={formControl.options}
					placeholder={formControl.placeholder}
					emptyIndicator={
						<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
							no selection found.
						</p>
					}
				/>
			);
		}
		switch (formControl.componentType) {
			case 'input': {
				return (
					<Input
						id={formControl.name}
						type={formControl.type}
						placeholder={formControl.placeholder}
						value={formData[formControl.name]}
						onChange={handleChange}
					/>
				);
			}
			case 'textarea' : {
				return (
					<Textarea 
						id={formControl.name}
						type={formControl.type}
						rows={formControl.rows}
						placeholder={formControl.placeholder}
						value={formData[formControl.name]}
						onChange={handleChange}
						className='resize-none'
					>
					</Textarea>
				)
			}
			
			case 'select': {
				return (
					<Select
						id={formControl.name}
						key={formControl.name}
						multiple={formControl.multiple}
						defaultValue={formControl.options[1]}
						value={formData[formControl.name]}
						// onValueChange={(value) => console.log(value)}
						onValueChange={(value) => setFormData({ ...formData, [formControl.name]: value })}
					>
					<SelectTrigger>
						<SelectValue placeholder={formControl.placeholder} />
					</SelectTrigger>
					<SelectContent>
						{
							formControl.options &&
							formControl.options.length > 0 ?
									formControl.options.map(optionItem => (<SelectItem key={optionItem.value} value={optionItem.value} name={formControl.name} className='capitalize'>{optionItem.value}</SelectItem>))
							: null
						}
					</SelectContent>
					</Select>
				)
			}
			default: {
				return (
					<Input
						key={formControl.name}
						id={formControl.name}
						type={formControl.type}
						placeholder={formControl.placeholder}
						value={formData[formControl.name]}
						onChange={handleChange}
					/>
				);
			}
		}
	}

	return (
		formControls.map(formControl => {
			return(
				<div className='flex flex-col gap-1.5' key={formControl.name}>
					<Label htmlFor={formControl.name} className='cursor-pointer'>{formControl.label}</Label>
					{renderFormControl(formControl)}
				</div>
			)
		})
	)
}

export default FormControls;