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
		placeholder: 'Select Category Keywords',
		componentType: "select",
		multiple: true,
		options: [
			{ label: "Clothes", value: "clothes" },
			{ label: "Men", value: "men" },
			{ label: "Women", value: "women" },
			{ label: "Kids", value: "kids" },
			{ label: "Sports", value: "sports" },
			{ label: "Food & Beverages", value: "food & beverages" },
			{ label: "Shoes", value: "shoes" }, { label: "Automobiles", value: "automobiles" }, { label: "Perfumes", value: "perfumes" }, { label: "Furniture", value: "furniture" }, { label: "Medicines & Drugs", value: "medicine & drugs" }

		]
	},
	{
		name: 'brand',
		label: 'Brand',
		placeholder: 'Select Brand',
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
		name: 'salePrice',
		label: 'Sale Price',
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