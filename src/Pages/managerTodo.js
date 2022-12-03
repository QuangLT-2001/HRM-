import { useAppDispatch, useAppSelector } from "app/hooks";
import authReducer, { authActions, authSlice, deleteContract } from "../features/auth/authSlice";
import { selectContract, selectIsLoading } from "../features/auth/authSlice";
import React, { useEffect, useState } from "react";
import contractApi from "services/contractApi";
import deleteApi from "./../services/contractApi"
import { ContractWrapper } from "./style";
import InputComponent from "components/input";
import CheckBoxComponent from "components/checkbox";
import InputNumerComponent from "components/inputNumber";
import { Table } from "reactstrap";
import ButtonComponent from "components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons"
import FormComponent from "./Form/form";
import { authSlice as ContractSlice } from "../features/auth/authSlice";
import { getAll as fetData } from "../services/helper"
import { getContract } from "../features/auth/authSlice";
import TableStandard from "./Table/tableStandard";
import { IconButton, ButtonToolbar } from "rsuite";
import AddOutLineIcon from "@rsuite/icons/AddOutline"
const ManagerTodo = () => {
     const [dataFilter, setDataFilter] = useState([])
     let [keyword, setKeyword] = useState("");
     const [value, setValue] = useState("")
     const [open, setOpen] = useState(false)
     const dispatch = useAppDispatch();

     const SelectContract = useAppSelector(selectContract)
     const SelectIsLoading = useAppSelector(selectIsLoading)
     const [state, setState] = useState({
          lishMent: "",
          typeContract: "",
          status: 0,
          description: "",
          id: ""
     })
     useEffect(() => {
          dispatch(getContract("managerTodo"))
     }, [])
     useEffect(() => {
          setKeyword(value)
          const convertUpperCase = keyword.toUpperCase()
          let data = SelectContract.filter(item => item.typeContract.toUpperCase().includes(convertUpperCase));
          setDataFilter(data)

     }, [keyword, value])
     let data = keyword ? dataFilter : SelectContract
     console.log("data", data);
     const { Column, HeaderCell, Cell } = Table
     // const handleClickDelete = (id) => {
     //      dispatch(deleteContract(id, "contract"))

     //      // dispatch(authSlice.actions.getLstContract(id))
     // }
     const handleCloseOpen = () => {
          setOpen(state => !state)
     }
     const handleClickEdit = obj => {
          setOpen(true)
          setState(obj)
     }
     if (SelectIsLoading) return <>Loading...</>
     return <ContractWrapper className="main__body flex-grow-1">

          <FormComponent url="managerTodo" state={state} setState={setState} open={open} handleCloseOpen={handleCloseOpen} setOpen={setOpen} />
          <div className="form__page d-flex justify-content-center w-100 p-3 bg-white">
               <InputComponent value={value} onChange={setValue} placeholder="Tìm kiếm" />
               {/* <ButtonToolbar>
                    <IconButton icon={AddOutLineIcon} placement="left">Thêm mới</IconButton>
               </ButtonToolbar> */}
               <ButtonToolbar className="ms-3" onClick={handleCloseOpen}>
                    <IconButton icon={<AddOutLineIcon />} placement="left">Thêm mới</IconButton>
               </ButtonToolbar>
          </div>
          <div className="table">
               {/* <div className="filter__table">
                    <CheckBoxComponent />
                    <div className="filter__table__right">
                         <div className="size__filter">
                              <span>Hiển thị</span>
                              <InputNumerComponent />
                         </div>
                    </div>
               </div> */}
               {/* <Table className="w-100 table table-bordered">
                    <thead>
                         <th></th>
                         <th>Loại Hợp Đồng</th>
                         <th>Mô tả</th>
                         <th>Trạng thái</th>
                    </thead>
                    <tbody>
                         {data.length ? data.map(item => {
                              return <tr key={item.id}>
                                   <td>
                                        <CheckBoxComponent />
                                        <ButtonComponent
                                             onClick={() => handleClickDelete(item.id)}
                                             appearance="subtle" icon={<FontAwesomeIcon icon={faPen} />}

                                        />
                                        <ButtonComponent
                                             onClick={() => handleClickDelete(item.id)}
                                             appearance="subtle" icon={<FontAwesomeIcon icon={faTrash} />}

                                        />
                                   </td>
                                   <td>{item.typeContract}</td>
                                   <td>{item.descript}</td>
                                   <td>{item.status ? <span className="text-white bg-success p-2 d-inline-block rounded">
                                        Đang hoạt đông
                                   </span> : <span className="text-white bg-warning p-2 d-inline-block rounded">Ngừng hoạt động</span>}</td>
                              </tr>
                         }) : "Dữ liệu trống"}
                    </tbody>
               </Table> */}
               <TableStandard url="managerTodo" data={data} handleClickEdit={handleClickEdit} />
          </div>
     </ContractWrapper>
}
export default ManagerTodo;