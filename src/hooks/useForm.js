import React, { useState } from 'react'

const useForm = (initialState) => {
	const [formData, setFormData] = useState(initialState);
	const handleChange=(event)=> {
		setFormData({...formData, [event.target.name]: event.target.value})
	}
	return {formData, handleChange}
}

export default useForm