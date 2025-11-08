import React from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../convex/_generated/api';
import { useMutation } from 'convex/react';

import CoDLogo from '/assets/checkout/icon-cash-on-delivery.svg';
import successLogo from '/assets/checkout/icon-order-confirmation.svg';

const Checkout = (props) => {
	const [success, setSuccess] = React.useState(false);
	const [selectedPaymentMethod, setSelectedPaymentMethod] =
		React.useState('e-Money');

	// Convex mutation hooks
	const createOrderMutation = useMutation(api.createOrder.default);
	const sendEmailMutation = useMutation(api.sendEmail.default);

	const handlePaymentMethodChange = (event) => {
		setSelectedPaymentMethod(event.target.value);
	};

	const [formData, setFormData] = React.useState({
		name: '',
		email: '',
		phoneNumber: '',
		address: '',
		zipCode: '',
city: '',
		country: '',
		eMoneyNumber: '',
		eMoneyPin: '',
	});

	const [formErrors, setFormErrors] = React.useState({});

	// Validation
	const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
	const validatePhoneNumber = (phoneNumber) =>
		/^\+?234\d{8,10}$|^0\d{9,10}$/.test(phoneNumber.replace(/\s+/g, ''));

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		const newFormErrors = {};

		// Basic field checks
		if (!formData.name.trim()) newFormErrors.name = 'Name is required';
		if (!formData.address.trim())
newFormErrors.address = 'Address is required';
		if (!formData.zipCode.trim())
			newFormErrors.zipCode = 'ZIP Code is required';
		if (!formData.city.trim()) newFormErrors.city = 'City is required';
		if (!formData.country.trim())
			newFormErrors.country = 'Country is required';

		// Email validation
		if (!formData.email.trim()) newFormErrors.email = 'Email is required';
		else if (!validateEmail(formData.email))
			newFormErrors.email = 'Invalid email format';

		// Phone validation
		if (!formData.phoneNumber.trim())
			newFormErrors.phoneNumber = 'Phone number is required';
		else if (!validatePhoneNumber(formData.phoneNumber))
			newFormErrors.phoneNumber = 'Invalid phone number format';

		// e-Money validation
		if (selectedPaymentMethod === 'e-Money') {
			if (!formData.eMoneyNumber.trim())
				newFormErrors.eMoneyNumber = 'Number is required';
			if (!formData.eMoneyPin.trim())
				newFormErrors.eMoneyPin = 'PIN is required';
		}

		setFormErrors(newFormErrors);

		const isFormInvalid = Object.values(newFormErrors).some(
			(error) => error !== ''
		);

		if (!isFormInvalid) {
			const orderData = {
				name: formData.name,
				email: formData.email,
				phone: formData.phoneNumber,
				address: formData.address,
				zip: formData.zipCode,
				city: formData.city,
				country: formData.country,
				paymentMethod: selectedPaymentMethod,
				eMoneyNumber:
					selectedPaymentMethod === 'e-Money'
						? formData.eMoneyNumber
						: undefined,
				eMoneyPin:
					selectedPaymentMethod === 'e-Money'
						? formData.eMoneyPin
						: undefined,
				items: props.cart.map((item) => ({
					id: item.id || item._id,
					name: item.name,
					price: item.price,
					quantity: item.quantity,
				})),
				total: props.totalPrice,
				grandTotal: Math.floor(
					props.totalPrice + 50 + props.totalPrice * 0.2
				),
			};

			try {
				// Create the order in Convex
				await createOrderMutation(orderData);

				// Send confirmation email
				await sendEmailMutation({
					to: formData.email,
					name: formData.name,
					orderItems: orderData.items,
					grandTotal: orderData.grandTotal,
				});

				setSuccess(true);
			} catch (error) {
				console.error('Error creating order or sending email:', error);
			}
		}
	};

	const cartItems = props.cart.map((item, index) => (
		<div
			key={index}
			className='w-full flex items-center justify-between'>
			<div className='flex items-center gap-4'>
				<img
					src={item.image}
				className='w-16 h-16 rounded-[8px]'
				alt={item.name}
				/>
				<div className='flex flex-col'>
					<p className='text-[15px] font-bold leading-[25px] text-black'>
						{item.name}
					</p>
					<p className='text-[14px] font-bold leading-[25px] text-black/50'>
						$ {item.price}
					</p>
				</div>
			</div>
			<div className='flex p-[15px] items-center'>
				<p className='text-[15px] font-bold text-black/50'>
					x{item.quantity}
				</p>
			</div>
		</div>
	));

	return (
		<main className='mt-[95px] bg-gray-light'>
			{/* Back Button */}
			<div className='xs:px-[24px] md:px-[40px] lg:px-[165px] xs:pt-4 md:pt-8 lg:pt-[79px]'>
				<Link
					relative='path'
					to='..'>
					<button className='text-black/50 cursor-pointer hover:text-cream transition-all duration-150'>
						Go back
					</button>
				</Link>
			</div>

			<div className='xs:px-[24px] md:px-[40px] lg:px-[165px] mt-[38px] pb-[140px] flex xs:flex-col xl:flex-row gap-8 xs:items-center xl:items-start'>
				{/* Left Form Section */}
				<section className='bg-white p-12 rounded-[8px] w-full'>
					<h3>Checkout</h3>
					<form onSubmit={handleFormSubmit}>
						{/* Billing Details */}
						<div className='mt-[41px]'>
							<div className='flex items-center justify-between'>
								<p className='text-cream text-[13px] font-bold uppercase leading-[25px] tracking-wide'>
									Billing Details
								</p>
							</div>

							<div className='flex xs:flex-col md:flex-row items-center gap-4 mt-4'>
								<div className='flex flex-col w-full'>
									<label
										htmlFor='name'
										className={`text-xs font-bold ${
											formErrors.name
												? 'text-red-600'
												:'text-black'
										}`}>
										Name
									</label>
									<p className='text-red-600 text-xs font-medium'>
										{formErrors.name}
									</p>
									<input
										type='text'
										id='name'
										name='name'
										placeholder='Alexei Ward'
										value={formData.name}
										onChange={handleInputChange}
										className={`placeholder:text-[14px] text-black font-bold py-[18px] px-[24px] bg-white rounded-lg border border-stone-300 focus:outline-cream caret-cream mt-[9px] ${
											formErrors.name? 'border-red-600'
												: ''
										}`}
									/>
								</div>
							</div>

							<div className='flex xs:flex-col md:flex-row items-center gap-4 mt-4'>
								<div className='flex flex-col w-full'>
								<label
										htmlFor='email'
										className={`text-xs font-bold ${
											formErrors.email
												? 'text-red-600'
												: 'text-black'
										}`}>
										Email Address
									</label>
									<p className='text-red-600 text-xs font-medium'>
										{formErrors.email}
									</p>
									<input
										type='email'
										id='email'
										name='email'
										placeholder='alexei@mail.com'
										value={formData.email}
										onChange={handleInputChange}
										className={`placeholder:text-[14px] text-black font-bold py-[18px] px-[24px] bg-white rounded-lg border border-stone-300 focus:outline-cream caret-cream mt-[9px] ${
											formErrors.email? 'border-red-600'
												: ''
										}`}
									/>
								</div>
							</div>

							<div className='flex xs:flex-col md:flex-row items-center gap-4 mt-4'>
								<div className='flex flex-col w-full'>
								<label
										htmlFor='phoneNumber'
										className={`text-xs font-bold ${
											formErrors.phoneNumber
												? 'text-red-600'
												: 'text-black'
										}`}>
										Phone Number
									</label>
									<p className='text-red-600 text-xs font-medium'>
										{formErrors.phoneNumber}
									</p>
									<input
										type='tel'
										id='phoneNumber'
										name='phoneNumber'
										placeholder='+1 202-555-0136'
										value={formData.phoneNumber}
										onChange={handleInputChange}
										className={`placeholder:text-[14px]text-black font-bold py-[18px] px-[24px] bg-white rounded-lg border border-stone-300 focus:outline-cream caret-cream mt-[9px] ${
											formErrors.phoneNumber? 'border-red-600'
												: ''
										}`}
									/>
								</div>
							</div>
						</div>

						<div className='mt-[41px]'>
							<div className='flex items-center justify-between'>
								<p className='text-cream text-[13px] font-bold uppercase leading-[25px] tracking-wide'>
									Shipping Info
								</p>
							</div>

							<div className='flex flex-col w-full mt-4'>
								<div className='flex flex-col w-full'>
									<label
										htmlFor='address'
										className={`text-xs font-bold ${
											formErrors.address
												? 'text-red-600'
												: 'text-black'
										}`}>
										Your Address
									</label>
									<p className='text-red-600 text-xs font-medium'>
										{formErrors.address}
									</p>
									<input
										type='text'
									id='address'
										name='address'
										placeholder='1137 Williams Avenue'
										value={formData.address}
										onChange={handleInputChange}
										className={`placeholder:text-[14px] text-black font-bold py-[18px] px-[24px] bg-white rounded-lg border border-stone-300 focus:outline-cream caret-cream mt-[9px] ${
											formErrors.address? 'border-red-600'
												: ''
										}`}
									/>
								</div>
							</div>

							<div className='flex xs:flex-col md:flex-row items-center gap-4 mt-4'>
								<div className='flex flex-col w-full'>
								<label
										htmlFor='zipCode'
										className={`text-xs font-bold ${
											formErrors.zipCode
												? 'text-red-600'
												: 'text-black'
										}`}>
										ZIP Code
									</label>
									<p className='text-red-600 text-xs font-medium'>
										{formErrors.zipCode}
									</p>
									<input
										type='text'
										id='zipCode'
										name='zipCode'
										placeholder='10001'
										value={formData.zipCode}
										onChange={handleInputChange}
										className={`placeholder:text-[14px] text-black font-bold py-[18px] px-[24px] bg-white rounded-lg border border-stone-300 focus:outline-cream caret-cream mt-[9px] ${
											formErrors.zipCode
												? 'border-red-600'
												: ''
										}`}
									/>
								</div>

								<div className='flex flex-col w-full'>
									<label
										htmlFor='city'
										className={`text-xs font-bold ${
											formErrors.city
												?'text-red-600'
												: 'text-black'
										}`}>
										City
									</label>
									<p className='text-red-600 text-xs font-medium'>
										{formErrors.city}
									</p>
									<input
										type='text'
									id='city'
										name='city'
										placeholder='New York'
										value={formData.city}
										onChange={handleInputChange}
										className={`placeholder:text-[14px] text-black font-bold py-[18px] px-[24px] bg-white rounded-lg border border-stone-300focus:outline-cream caret-cream mt-[9px] ${
											formErrors.city? 'border-red-600'
												: ''
										}`}
									/>
								</div>
							</div>

							<div className='flex xs:flex-col md:flex-row items-center gap-4 mt-4'>
								<div className='flex flex-col w-full'>
								<label
										htmlFor='country'
										className={`text-xs font-bold ${
											formErrors.country
												? 'text-red-600'
												: 'text-black'
										}`}>
										Country
									</label>
									<p className='text-red-600 text-xs font-medium'>
										{formErrors.country}
									</p>
									<input
										type='text'
										id='country'
										name='country'
										placeholder='United States'
										value={formData.country}
										onChange={handleInputChange}
										className={`placeholder:text-[14px] text-black font-bold py-[18px] px-[24px] bg-white rounded-lg border border-stone-300 focus:outline-cream caret-cream mt-[9px] ${
											formErrors.country? 'border-red-600'
												: ''
										}`}
									/>
								</div>
							</div>
						</div>

						{/* Payment Section */}
						<div className='mt-[61px]'>
							<div className='flex items-center justify-between'>
								<p className='text-cream text-[13px] font-bold uppercase leading-[25px] tracking-wide'>
									Payment Details
								</p>
							</div>

							<div className='flex xs:flex-col md:flex-row mt-4 justify-between'>
								<label className='text-black text-xs font-bold flex-1'>
									Payment Methods
								</label>
								<div className='flex flex-col flex-1 gap-4'>
									<div className='flex items-center gap-4 p-[18px] rounded-lg border border-stone-300 hover:border-cream transition-allduration-150'>
										<input
											type='radio'
											className='cursor-pointer accent-cream'
											name='payment'
											value='e-Money'
											checked={
												selectedPaymentMethod ===
												'e-Money'
											}
											onChange={handlePaymentMethodChange}
										/>
										<label className='text-black text-xs font-bold'>
											e-Money
										</label>
									</div>
									<div className='flex items-center gap-4 p-[18px] rounded-lg border border-stone-300 hover:border-cream transition-all duration-150'>
										<input
											type='radio'
											className='cursor-pointer accent-cream'
											name='payment'
											value='CashonDelivery'
											checked={
												selectedPaymentMethod ===
												'Cash on Delivery'
											}
											onChange={handlePaymentMethodChange}
										/>
										<label className='text-black text-xs font-bold'>
											Cash on Delivery
										</label>
									</div>
								</div>
							</div>
						</div>

						{/* e-Money Inputs */}
						{selectedPaymentMethod === 'e-Money' && (
							<div className='flex xs:flex-col md:flex-row items-center gap-4 mt-4'>
								<div className='flex flex-col w-full'>
<label
										htmlFor='eMoneyNumber'
										className={`text-xs font-bold ${
											formErrors.eMoneyNumber
												? 'text-red-600'
												: 'text-black'
										}`}>
										e-Money Number
									</label>
									<p className='text-red-600 text-xs font-medium'>
										{formErrors.eMoneyNumber}
									</p>
									<input
										type='text'
										id='eMoneyNumber'
										name='eMoneyNumber'
										placeholder='238521993'
										value={formData.eMoneyNumber}
										onChange={handleInputChange}
										className={`placeholder:text-[14px] text-black font-bold py-[18px] px-[24px] bg-white rounded-lg border border-stone-300 focus:outline-cream caret-cream mt-[9px] ${
											formErrors.eMoneyNumber
												? 'border-red-600'
												: ''
}`}
										maxLength={9}
									/>
								</div>
								<div className='flex flex-col w-full'>
									<label
										htmlFor='eMoneyPin'
										className={`text-xs font-bold ${
											formErrors.eMoneyPin
												? 'text-red-600'
												: 'text-black'
										}`}>
										e-Money PIN
									</label>
									<p className='text-red-600 text-xs font-medium'>
									{formErrors.eMoneyPin}
									</p>
									<input
										type='text'
										id='eMoneyPin'
										name='eMoneyPin'
										placeholder='6891'
										value={formData.eMoneyPin}
										onChange={handleInputChange}
										className={`placeholder:text-[14px] text-black font-bold py-[18px] px-[24px] bg-white rounded-lg border border-stone-300 focus:outline-cream caret-cream mt-[9px] ${
											formErrors.eMoneyPin? 'border-red-600'
												: ''
										}`}
										maxLength={4}
									/>
								</div>
							</div>
						)}

						{/* Cash on Delivery Info */}
						{selectedPaymentMethod === 'Cash on Delivery' && (
							<div className='mt-[30px] flex xs:flex-col md:flex-row items-center gap-8'>
								<img
									src={CoDLogo}
									alt='Cash on Delivery'
								/>
								<p className='text-black/50 text-[15px] font-medium leading-[25px]'>
									The 'Cash on Delivery' option enables you to
									pay in cash when our delivery courier
									arrives at your residence. Just make sure
									your address is correct so that your order
									will not be cancelled.
								</p>
							</div>
						)}

						<div className='mt-8'>
							<button
								type='submit'
								className='btn w-full bg-cream text-white hover:bg-cream-light transition-all duration-150'>
								Continue & Pay
							</button>
						</div>
					</form>
				</section>

			{/* Summary Section */}
				<section className='rounded-[8px] p-8 bg-white xs:w-full xl:w-auto'>
					<h6 className='h6 text-black'>Summary</h6>
					<div className='flex flex-col items-center gap-6 py-8 overflow-y-auto max-h-[304px] xs:w-full lg:w-[284px]'>
						{cartItems}
					</div>

					<div className='flex flex-col gap-2'>
						<div className='flex items-center justify-between'>
							<p className='text-[15px] font-[500] text-black/50 uppercase'>
								Total
							</p>
							<h6 className='font-bold text-black'>
								$ {props.totalPrice}
							</h6>
						</div>
						<div className='flex items-center justify-between'>
							<p className='text-[15px] font-[500] text-black/50 uppercase'>
								Shipping
							</p>
							<h6 className='font-bold text-black'>$ 50</h6>
						</div>
						<div className='flex items-center justify-between'>
							<p className='text-[15px] font-[500] text-black/50 uppercase'>
								VAT (Included)
							</p>
							<h6 className='font-bold text-black'>
								$ {Math.floor(props.totalPrice * 0.2)}
							</h6>
						</div>
						<div className='flex items-center justify-between mt-4'>
							<p className='text-[15px] font-[500] text-black/50 uppercase'>
								Grand Total
							</p>
							<h6 className='font-bold text-cream'>
								${' '}
								{Math.floor(
									props.totalPrice +
										50 +
										props.totalPrice * 0.2
								)}
							</h6>
						</div>
					</div>
				</section>
			</div>

			{/* Success Modal */}
			{success && (
				<>
					<div className='fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-[50]' />
					<section className='fixed xs:left-4 xs:right-4 md:left-[20%] lg:left-[35%] xs:top-32 md:top-[222px] bg-white xs:w-auto md:w-[540px] h-[581px] flex flex-col justify-center xs:p-8 md:p-12 z-50 rounded-lg'>
						<img
src={successLogo}
							alt='Success'
						/>
						<h3 className='xs:mt-[23px] md:mt-[33px]'>
							Thank you for your order
						</h3>
						<p className='text-black/50 xs:mt-4 md:mt-6'>
							You will receive an email confirmation shortly.
						</p>

						<div className='flex xs:flex-col md:flex-row items-center xs:mt-4 md:mt-[33px] w-full'>
							<div className='bg-gray-light xs:rounded-t-lg md:rounded-bl-lg flex flex-col gap-2 max-h-[280px] w-full overflow-y-auto'>
								{cartItems}
							</div>
							<div className='bg-stone xs:rounded-b-lg md:rounded-tr-lg flex flex-col justify-center w-full'>
								<p className='text-[15px] font-[500] text-white/50 uppercase ml-8'>
									Grand Total
								</p>
								<h6 className='font-bold text-white ml-8'>
									${' '}
									{Math.floor(
									props.totalPrice +
											50 +
											props.totalPrice * 0.2
									)}
								</h6>
							</div>
						</div>

						<Link
							to='/'
							className='w-full'>
							<button className='btn bg-cream hover:bg-cream-light transition-all duration-150 mt-[46px] w-full'>
								Back to Home
							</button>
						</Link>
					</section>
				</>
			)}
		</main>
	);
};

export default Checkout;
