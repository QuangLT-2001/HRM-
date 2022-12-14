import { useAppDispatch, useAppSelector } from "app/hooks";
import ButtonComponent from "components/button";
import { getLishMentByCode, postLishMent, putLishMent, selectIsLoading, TLishMentState } from "features/auth/authSlice";
import React, {useState, useEffect, useRef} from "react"
import {Form, SelectPicker, Input, Toggle} from "rsuite"
import {useParams, useNavigate} from "react-router-dom"
import { selectLishMentDetail } from "features/auth/authSlice";
const Textarea = React.forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);
const TTTCDetail = () => {


     const params = useParams();
     const {id} = params;
     let dispatch = useAppDispatch()
     let navigate = useNavigate()
     const [state, setState] = useState<any>({
          orgId: "",
          nameLishMent: "",
          MST: "",
          flagActive: false,
          nameAbb: "",
          typeLishMent: "",
          address: "",
          userContact: "",
          emailContact:"",
          telContact: ""
     })
     let SelectLishMentDetail = useAppSelector(selectLishMentDetail);
     let SelectIsLoading = useAppSelector(selectIsLoading)

     useEffect(() => {
          if(id) {
               dispatch(getLishMentByCode({
                    id: id,
                    url: "lishMent"
               }))


          }
     } , [id])

     // useEffect(() => {
     //      console.log("Detail11111111111", SelectLishMentDetail);
     //      setState(
     //           SelectLishMentDetail
     //      )
     // }, [])


useEffect(() => {
    if(!SelectIsLoading) {
     setState(SelectLishMentDetail)
    }
}, [SelectIsLoading])
     const formRef:any = React.useRef();
     const data= [{
          label: "ORG1001",
          value: "ORG1001"
     },
     {
          label: "ORG1002",
          value: "ORG1002"
     },
     {
          label: "ORG1003",
          value: "ORG1003"
     },
]
const dataType = [
     {
          id: 1,
          label: "HTML",
          value: "HTML"
     },
     {
          id: 2,
          label: "CSS",
          value: "CSS"
     },
     {
          id: 3,
          label: "Javascript",
          value: "Javascript"
     },
     {
          id: 4,
          label: "ReactJS",
          value: "ReactJS"
     },
     {
          id: 5,
          label: "C#",
          value: "C#"
     },
     {
          id: 6,
          label: "Docker",
          value: "Docker"
     }
]

const handleClickCancel = () => {
     setState({
          ...state,
          orgId: "",
     nameLishMent: "",
     MST: "",
     flagActive: false,
     nameAbb: "",
     typeLishMent: "",
     address: "",
     userContact: "",
     emailContact:"",
     telContact: ""
     })
}
const handleClickUpdate = ():any => {
     if(state.orgId && state.MST && state.nameLishMent && state.userContact && state.emailContact && state.telContact && state.nameAbb) {
          dispatch(putLishMent({
               state: state,
               url: "lishMent"
          }))


     setState({
          orgId: "",
          nameLishMent: "",
          MST: "",
          flagActive: false,
          nameAbb: "",
          typeLishMent: "",
          address: "",
          userContact: "",
          emailContact:"",
          telContact: ""
     })
     navigate("/quan-tri/thiet-lap-to-chuc/danh-sach-to-chuc/")
     }else {
          alert("M???i b???n nh???p ?????y ????? th??ng tin")
     }
}

     if(SelectIsLoading) return <>loading...</>

     return <div>
          <div className="header__form d-flex justify-content-end p-3 bg-white mb-2 mt-2">
              <ButtonComponent className="me-3" appearance="primary" color="green" name="C???p nh???t" onClick={handleClickUpdate}/>
               <ButtonComponent name="H???y" onClick={handleClickCancel}/>
          </div>
          <Form  fluid onChange={setState} formValue={state} ref={formRef} className="d-flex bg-white p-3" style={{height: "100vh"}}>
          <div className="frm-left me-5 w-50">
          <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>OrgID
                         <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Ch???n" name="orgId" style={{flexGrow: 1, width: "100%"}} accepter={SelectPicker} data={data}/>
                </Form.Group >

                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>T??n T??? Ch???c
                         <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nh???p" name="nameLishMent" style={{flexGrow: 1, width: "100%"}} cols={10} accepter={Textarea}/>
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>T??n vi???t t???t
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nh???p" name="nameAbb" style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>MST
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nh???p" name="MST" style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Lo???i t??? ch???c

                    </Form.ControlLabel>
                    <Form.Control placeholder="Nh???p" name="typeLishMent" style={{flexGrow: 1, width: "100%"}} accepter={SelectPicker} data={dataType}/>
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>?????a ch???

                    </Form.ControlLabel>
                    <Form.Control placeholder="Nh???p" name="address" row={2} style={{flexGrow: 1, width: "100%"}} accepter={Textarea}/>
                </Form.Group >
          </div>
<div className="frm-right ms-5 w-50">

<Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Ng?????i li??n h???
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nh???p" name="userContact" row={2} style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >

                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Email li??n h???
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nh???p" name="emailContact" row={2} style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >

                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>??i???n tho???i li??n h???
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control placeholder="Nh???p" name="telContact" row={2} style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >

                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Th???i gian t???o
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control disabled placeholder="" name="" row={2} style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Ng?????i  t???o
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control disabled placeholder="" name="" row={2} style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Th???i gian c???p nh???t
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control disabled placeholder="" name="" row={2} style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >
                <Form.Group controlId="name-9" className="d-flex w-100 align-items-center">
                    <Form.ControlLabel style={{minWidth: "200px"}}>Ng?????i c???p nh???t
                    <span className="text-danger">*</span>
                    </Form.ControlLabel>
                    <Form.Control disabled placeholder="" name="" row={2} style={{flexGrow: 1, width: "100%"}} />
                </Form.Group >

                <Form.Group  title="status"  controlId="name-9" className="d-flex align-items-center">
                <Form.ControlLabel style={{minWidth: "200px"}}>Tr???ng th??i

</Form.ControlLabel>
                <Form.Control  placeholder="M?? t???" name="flagActive" className="me-3 d-inline-block"  accepter={Toggle} />
                Ho???t ?????ng
                </Form.Group>
</div>



          </Form>
     </div>
}
export default TTTCDetail;