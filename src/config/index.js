export const registerFormControls = [
	{
		name: 'userName',
		label: 'User Name',
		placeholder: 'Enter Your User Name',
		componentType: "input",
		type: "text",
	},
	{
		name: 'email',
		label: 'Email',
		placeholder: 'Enter Your Email',
		componentType: "input",
		type: "text",
	},
	{	
		name: 'password',
		label: 'Create Password',
		placeholder: 'Enter a User Password',
		componentType: "input",
		type: "password",
	},
]
export const loginFormControls = [
	{
		name: "email",
		label: "Email",
		placeholder: "Enter your email",
		componentType: "input",
		type: "email",
	},
	{
		name: "password",
		label: "Password",
		placeholder: "Enter your password",
		componentType: "input",
		type: "password",
	},
];

export const productsFormControls = [
	{
		name: 'title',
		label: 'Title',
		placeholder: 'Enter Title',
		componentType: "input",
		type: "text",
	},
	{
		name: 'description',
		label: 'Description',
		placeholder: 'write a description',
		componentType: "textarea",
		rows:5,
		type: "text",
	},
	{
		name: 'category',
		label: 'Category',
		placeholder: 'Category',
		componentType: "select",
		options: [{ value: "clothes" }, { value: "shoes" }, { value: "automobiles" }, { value: "perfumes" }, { value: "furniture" }, { value: "foods" }, { value: "medicine and drugs"}]
	},
	{
		name: 'brand',
		label: 'Brand',
		placeholder: 'Enter Your Email',
		componentType: "select",
		options: [{ value: "nike" }, { value: "adidas" }, { value: "gucci" }, { value: "puma" }, { value: "dior"},]
	},
	
	
	{
		name: 'price',
		label: 'Price',
		placeholder: '0',
		componentType: "input",
		type: "number",
	},
	{
		name: 'amount',
		label: 'Amount in Stock',
		placeholder: '0',
		componentType: "input",
		type: "number",
	},
];