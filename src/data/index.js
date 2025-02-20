
export const sortOptions = [
	{ value: "salePrice-asc", label: "Price: Asc" },
	{ value: "salePrice-desc", label: "Price: Desc" },
	// { value: "title-asc", label: "Title: A to Z" },
	// { value: "title-desc", label: "Title: Z to A" },
	{ value: "createdAt-desc", label: "Date: newest" },
	{ value: "createdAt-asc", label: "Date: oldest" },
];

export const brands = [
	{ value: "nike" },
	{ value: "adidas" },
	{ value: "gucci" },
	{ value: "puma" },
	{ value: "levi" },
	{ value: "sketchers" },
	{ value: "dior" },
];

export const prodCategories = [
	{ label: "Clothes", value: "clothes", },
	{ label: "Bags", value: "bags" },
	{ label: "Education", value: "education" },
	{ label: "Electronics", value: "electronics", icon: 'kids', emoji: '💻', main: true, },
	{ label: "Computer", value: "computer" },
	{ label: "Mobile Phones", value: "mobile phones" },
	{ label: "Health", value: "health" },
	{ label: "Fitness", value: "fitness" },
	{ label: "Jewelry", value: "jewelry" },
	{ label: "Watch", value: "watch" },
	{ label: "Men", value: "men", icon: 'men', emoji: '🧔🏼‍♂️', main: true, },
	{ label: "Women", value: "women", icon: 'kids', emoji: '👩🏼', main: true, },
	{ label: "Kids", value: "kids", icon: 'kids', emoji: '🧒🏼', main: true, },
	{ label: "Shoes", value: "shoes" },
	{ label: "Sports", value: "sports" },
	{ label: "Food & Beverages", value: "food & beverages" },
	{ label: "Automobiles", value: "automobiles", icon: 'CarFront', emoji: '🚘', main: true, },
	{ label: "Perfumes", value: "perfumes", },
	{ label: "Furniture", value: "furniture" },
	{ label: "Medicines & Drugs", value: "medicine & drugs" }
];

export const prodFilters = [
	{ title: "category", options: prodCategories },
	{ title: "brand", options: brands },
];
// export const prodFilters = {
// 	category: prodCategories,
// 	brands: brands,
// };

export const iconSize = {
	small: 14,
	medium: 24,
};

export const menuDataItems = [
	{
		label: "dashboard",
		link: "/admin/dashboard",
		icon: null,
		active: true,
		filters: []
	},
	{
		label: "products",
		link: "/admin/products",
		icon: null,
		active: false,
		filters: prodFilters,
	},
	{
		label: "orders",
		link: "/admin/orders",
		icon: null,
		active: false,
		filters: []
	},
	{
		label: "sales",
		link: "/admin/sales",
		icon: null,
		active: false,
		filters: [
		]
	},
	{
		label: "features",
		link: "/admin/features",
		icon: null,
		active: false,
		filters: [

		]
	},
];
// export const menuDataItems = [
// 	{
// 		label: "dashboard",
// 		link: "/admin/dashboard",
// 		icon: null,
// 		active: false,
// 		filters: null
// 	},
// 	{
// 		label: "products",
// 		link: "/admin/products",
// 		icon: null,
// 		active: false,
// 		filters: prodFilters,
// 	},
// 	{
// 		label: "orders",
// 		link: "/admin/orders",
// 		icon: null,
// 		active: false,
// 		filters: null
// 	},
// 	{
// 		label: "sales",
// 		link: "/admin/sales",
// 		icon: null,
// 		active: false,
// 		filters: null
// 	},
// 	{
// 		label: "features",
// 		link: "/admin/features",
// 		icon: null,
// 		active: false,
// 		filters: [
// 
// 		]
// 	},
// ];

export const initialFiltersData = {
	title: '',
	category: [],
	amount: '',
	brand: [],
	sortBy: '',
	strict: false,
};
export const initialProductFormData = {
	imageURL: '',
	title: '',
	description: '',
	brand: '',
	category: [],
	price: '',
	salePrice: 0,
	amount: 1,
};



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
];
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
		rows: 5,
		type: "text",
	},
	{
		name: 'category',
		label: 'Category',
		placeholder: 'Select Category Keywords',
		componentType: "select",
		multiple: true,
		options: prodCategories,
	},
	{
		name: 'brand',
		label: 'Brand',
		placeholder: 'Select Brand',
		componentType: "select",
		options: brands
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