import React from "react"
import Button from "rsuite/Button"
import IconButton from "rsuite/IconButton"
type ButtonProps = {
     icon?: any;
     appearance?: "default" | "primary" | "link" | "subtle" | "ghost";
     onClick?: any;
     name?: string,
     color? : "red"|"green"|"yellow",
     className?: string | undefined
}
const ButtonComponent:React.FC<ButtonProps> = (props) => {
     return <Button className={props.className} color={props.color}  appearance={props.appearance} onClick={props.onClick}>
          {props.icon ? props.icon : ""} {props.name}
     </Button>
}
export default ButtonComponent