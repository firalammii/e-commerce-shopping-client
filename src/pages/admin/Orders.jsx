import React from 'react'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

const Orders = () => {
	return (
		<section className='m-4'>
			<Card>
				<CardHeader>
					<CardTitle className='text-3xl font-bold tracking-tighter'>All Orders</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableCaption>A list of recent orders</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead className="">Order Id</TableHead>
								<TableHead>Order Date</TableHead>
								<TableHead>Order Status</TableHead>
								<TableHead className="">Order Price</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>{new Date().toLocaleDateString()}</TableCell>
								<TableCell>paid</TableCell>
								<TableCell className="">$250.00</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>	
		</section>
	)
}

export default Orders