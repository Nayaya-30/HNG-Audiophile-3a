// src/components/organisms/CheckoutForm.tsx
import {
	Box,
	Heading,
	SimpleGrid,
	Text,
	useRadioGroup,
	Image,
	HStack,
	Stack,
	Button,
	Spinner,
	useToast,
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { generateEmailHTML } from '../../../lib/emailTemplate'
import { useSelector } from 'react-redux'
import { cartItems } from '../../../store/CartSlice'
import { useModal } from '../../../store/ModalContextProvider'

import FormLegend from '../../../components/atoms/FormLegend'
import FormField from '../../../components/molecules/FormField'
import Radio from '../../../components/atoms/Radio'
import Summary from '../../../components/molecules/Summary'

type FormData = {
	name: string
	emailAddress: string
	phoneNumber: string
	address: string
	ZIPCode: string
	city: string
	country: string
	paymentMethod: 'e-Money' | 'Cash on Delivery'
	eMoneyNumber?: string
	eMoneyPin?: string
}

const CheckoutForm = (): JSX.Element => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm<FormData>({ mode: 'onBlur' })

	const toast = useToast()
	const { onCheckoutModalOpen } = useModal()
	const items = useSelector(cartItems)
	const createOrder = useMutation(api.createOrder.default)

	const [loading, setLoading] = useState(false)
	const [isDisabled, setIsDisabled] = useState(true)
	const paymentMethod = watch('paymentMethod') || 'e-Money'
	const formRef = useRef<HTMLFormElement>(null)

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'paymentMethod',
		defaultValue: 'e-Money',
		onChange: value => setValue('paymentMethod', value as any),
	})
	const group = getRootProps()

	const onSubmit: SubmitHandler<FormData> = async data => {
		if (loading) return
		setLoading(true)
		try {
			// ... save order ...
			const orderData = {
				name: data.name,
				email: data.emailAddress,
				phone: data.phoneNumber,
				address: data.address,
				zip: data.ZIPCode,
				city: data.city,
				country: data.country,
				paymentMethod: data.paymentMethod,
				eMoneyNumber: data.eMoneyNumber,
				eMoneyPin: data.eMoneyPin,
				items: items.map(i => ({
					id: i.id.toString(),
					name: i.shortName,
					price: i.price,
					quantity: i.quantity,
				})),
				total: items.reduce((s, i) => s + i.price * i.quantity, 0),
				grandTotal: items.reduce((s, i) => s + i.price * i.quantity, 0) + 50 + 1079,
			}

			// 1. Save to Convex
			const orderResult = await createOrder(orderData)
			const fullOrder = { ...orderData, ...orderResult }
			const emailHtml = generateEmailHTML(fullOrder)


			// SEND EMAIL — NO TIMEOUT
			const emailResponse = await fetch("/api/send-email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					to: data.emailAddress,
					name: data.name,
					orderItems: items.map(i => ({
						name: i.shortName,
						quantity: i.quantity,
						price: i.price,
					})),
					grandTotal: orderData.grandTotal,
				}),
			})

			if (!emailResponse.ok) {
				const err = await emailResponse.text()
				throw new Error(`Email failed: ${err}`)
			}

			// SUCCESS!
			onCheckoutModalOpen()
			dispatch(clearCart())
			toast({ title: "Order Confirmed!", status: "success" })

		} catch (err: any) {
			toast({ title: "Failed", description: err.message, status: "error" })
		} finally {
			setLoading(false)
		}

	}
	return (
		<Stack
			as="form"
			ref={formRef}
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			direction={{ base: 'column', lg: 'row' }}
			spacing={{ base: '3rem', lg: '1.875rem' }}
			align="flex-start"
			mx="auto"
			// px={{ base: '1rem', lg: '10.3125rem' }}
			mt={{ base: '1.5rem', lg: '4.9375rem' }}
			minW={{ sm: '100%', md: '70%' }}
		>
			{/* LEFT: FORM */}
			<Box
				bg="#FFFFFF"
				borderRadius="0.5rem"
				p={{ base: '1.5rem', lg: '3.375rem' }}
				flex="1"
				width="100%"
				maxW={{ lg: '45.625rem' }}
				boxShadow="0 20px 40px rgba(0,0,0,0.05)"
			>
				<Heading
					as="h1"
					fontSize={{ base: '1.75rem', lg: '2.625rem' }}
					fontWeight="bold"
					letterSpacing="0.1rem"
					textTransform="uppercase"
					mb="2.5rem"
				>
					Checkout
				</Heading>

				{/* BILLING DETAILS */}
				<Box as="fieldset" mb="3.3125rem" width="100%">
					<FormLegend>Billing Details</FormLegend>
					<SimpleGrid columns={{ base: 1, md: 2 }} spacing="1rem" width="100%">
						<FormField
							label="Name"
							placeholder="Alexei Ward"
							{...register('name', {
								required: "Can't be empty",
								pattern: { value: /^[^<>%$#^*]*$/, message: 'Invalid name' },
							})}
							errors={errors.name}
						/>
						<FormField
							label="Email Address"
							type="email"
							placeholder="alexei@mail.com"
							{...register('emailAddress', {
								required: "Can't be empty",
								pattern: {
									value: /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/,
									message: 'Wrong format',
								},
							})}
							errors={errors.emailAddress}
						/>
						<FormField
							label="Phone Number"
							placeholder="+1 202-555-0136"
							{...register('phoneNumber', {
								required: "Can't be empty",
								pattern: {
									value: /^[+]?[0-9][\s-]?[0-9\s-]*$/,
									message: 'Invalid phone number',
								},
							})}
							errors={errors.phoneNumber}
						/>
					</SimpleGrid>
				</Box>

				{/* SHIPPING INFO */}
				<Box as="fieldset" mb="3.3125rem" width="100%">
					<FormLegend>Shipping Info</FormLegend>
					<SimpleGrid columns={{ base: 1, md: 2 }} spacing="1rem" width="100%">
						<FormField
							label="Address"
							placeholder="1137 Williams Avenue"
							{...register('address', { required: "Can't be empty" })}
							errors={errors.address}
						/>
						<FormField
							label="ZIP Code"
							placeholder="10001"
							{...register('ZIPCode', {
								required: "Can't be empty",
								pattern: { value: /^\d{5}(-\d{4})?$/, message: 'Wrong format' },
							})}
							errors={errors.ZIPCode}
						/>
						<FormField
							label="City"
							placeholder="New York"
							{...register('city', { required: "Can't be empty" })}
							errors={errors.city}
						/>
						<FormField
							label="Country"
							placeholder="United States"
							{...register('country', { required: "Can't be empty" })}
							errors={errors.country}
						/>
					</SimpleGrid>
				</Box>

				{/* PAYMENT DETAILS */}
				<Box as="fieldset" width="100%">
					<FormLegend>Payment Details</FormLegend>
					<SimpleGrid
						columns={{ base: 1, md: 2 }}
						spacingX="1rem"
						mb="1rem"
						width="100%"
					>
						<Text fontWeight="bold" fontSize="0.75rem">
							Payment Method
						</Text>
						<Stack {...group} spacing="1rem">
							{['e-Money', 'Cash on Delivery'].map(value => {
								const radio = getRadioProps({ value })
								return (
									<Radio key={value} {...radio}>
										{value}
									</Radio>
								)
							})}
						</Stack>
					</SimpleGrid>

					<Box minH="8rem" width="100%">
						{paymentMethod === 'e-Money' ? (
							<SimpleGrid
								columns={{ base: 1, md: 2 }}
								spacing="1rem"
								width="100%"
							>
								<FormField
									label="e-Money Number"
									placeholder="238521993"
									{...register('eMoneyNumber', {
										required: "Can't be empty",
										pattern: { value: /^\d{9}$/, message: 'Wrong format' },
									})}
									errors={errors.eMoneyNumber}
								/>
								<FormField
									label="e-Money PIN"
									placeholder="6891"
									{...register('eMoneyPin', {
										required: "Can't be empty",
										pattern: { value: /^\d{4}$/, message: 'Wrong format' },
									})}
									errors={errors.eMoneyPin}
								/>
							</SimpleGrid>
						) : (
							<HStack
								spacing="2rem"
								mt="1.5rem"
								align="flex-start"
								width="100%"
							>
								<Image
									src="/images/checkout/icon-cash-on-delivery.svg"
									alt="Cash on delivery"
									boxSize="3rem"
									flexShrink={1}
								/>
								<Text fontSize="0.9375rem" lineHeight="1.6667" opacity="0.8">
									The ‘Cash on Delivery’ option enables you to pay in cash when
									our delivery courier arrives at your residence. Just make sure
									your address is correct so that your order will not be
									cancelled.
								</Text>
							</HStack>
						)}
					</Box>
				</Box>
			</Box>

			{/* RIGHT: SUMMARY */}
			<Summary
				formRef={formRef}
				isDisabled={isDisabled}
				setIsDisabled={setIsDisabled}
			/>

			{/* HIDDEN SUBMIT BUTTON */}
			<Button type="submit" position="absolute" left="-9999px">
				Submit
			</Button>
		</Stack>
	)
}

export default CheckoutForm
