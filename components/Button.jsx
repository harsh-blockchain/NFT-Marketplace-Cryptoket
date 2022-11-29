
const Button = ({classStyles,btnName,handleClick}) => {
  return (
    <button type='button' className={`nft-gradient text-sm minlg:text-lg py-3 px-7 minlg:px-8 font-poppins font-semibold text-white ${classStyles}`}
    onClick={handleClick}>
        {btnName}
    </button>
  )
}

export default Button