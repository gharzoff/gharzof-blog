const Input = ({label, state, setState, type = 'text'}) => {
	return (
		<div className='form-floating mb-1'>
			<input
				type={type}
				className='form-control'
				value={state}
				onChange={e => setState(e.target.value)}
				id={label+type}
				placeholder={label}
			/>
			<label htmlFor={label+type}>{label}</label>
		</div>
	)
}

export default Input