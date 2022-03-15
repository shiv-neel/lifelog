import React, { InputHTMLAttributes, useState } from 'react'
import { useField } from 'formik'
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Textarea,
	InputGroup,
	InputRightElement,
	Button,
} from '@chakra-ui/react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string
	name: string
	type: string
}

export const InputField: React.FC<InputFieldProps> = ({
	label,
	size,
	type,
	...props
}) => {
	const [show, setShow] = useState<boolean>(false)
	const [field, { error }] = useField(props)

	return (
		<FormControl my={3} isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<InputGroup size='md'>
				<Input
					isRequired
					{...field}
					{...props}
					id={field.name}
					placeholder={props.placeholder}
					type={
						field.name === 'password' || field.name === 'confirmPassword'
							? show
								? 'text'
								: 'password'
							: type
					}
				/>
				{field.name === 'password' || field.name === 'confirmPassword' ? (
					<InputRightElement width='3.5rem'>
						<Button h='2.5rem' size='sm' onClick={() => setShow((s) => !s)}>
							{show ? (
								<AiOutlineEyeInvisible className='text-3xl' />
							) : (
								<AiOutlineEye className='text-3xl' />
							)}
						</Button>
					</InputRightElement>
				) : (
					<></>
				)}
			</InputGroup>

			{error ? <FormErrorMessage>{error}</FormErrorMessage> : <></>}
		</FormControl>
	)
}
