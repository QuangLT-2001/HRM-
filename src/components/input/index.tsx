import Input from "rsuite/Input"
import InputGroup from "rsuite/InputGroup"
import SearchIcon from "@rsuite/icons/Search"
type InputProps = {
     value?: string;
     name?: string;
     onChange?: any,
     placeholder?: string
}
const InputComponent:React.FC<InputProps>  = (props) => {
     return <InputGroup style={{width: "450px", marginBottom: 10}}>
     <InputGroup.Addon>
          <SearchIcon />
     </InputGroup.Addon>
     <Input placeholder={props.placeholder} value={props.value} name={props.name} onChange={props.onChange}/>

</InputGroup>
}
export default InputComponent
