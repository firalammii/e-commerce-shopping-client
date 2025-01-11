import React from 'react'
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const FormControls = ({ formControls, formData, setFormData }) => {
	const handleChange=(e)=>{
		setFormData({...formData, [e.target.id]: e.target.value})
	}

	const renderFormControl =(formControl) =>{
		switch (formControl.componentType) {
			case 'input': {
				return (
					<Input
						id={formControl.name}
						type={formControl.type}
						placeholder={formControl.placeholder}
						value={FormData[formControl.name]}
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
						value={FormData[formControl.name]}
						onChange={handleChange}
						className='resize-none'
					>
					</Textarea>
				)
			}
			
			case 'select': {
				return (
					<Select 
						key={formControl.name}
						id={formControl.name}
						value={FormData[formControl.name]}
						onValueChange={handleChange}
					> 
					<SelectTrigger>
						<SelectValue placeholder={formControl.placeholder} />
					</SelectTrigger>
					<SelectContent>
						{
							formControl.options &&
							formControl.options.length > 0 ?
								formControl.options.map(optionItem => (<SelectItem  key={optionItem.value} value={optionItem.value} className='capitalize'>{optionItem.value}</SelectItem>))
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
						type={formData.type}
						placeholder={formControl.placeholder}
						value={FormData[formControl.name]}
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
					<Label>{formControl.label}</Label>
					{renderFormControl(formControl)}
				</div>
			)
		})
	)
}

export default FormControls;