import { TLishMentState } from "features/auth/authSlice"
import React, {useState, useEffect} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCheck, faAngleDown, faPen, faTrash} from "@fortawesome/free-solid-svg-icons"
import {v4 as uuidv4} from "uuid"

import CheckBoxComponent from "../../components/checkbox";
import { Pagination, Checkbox, Row, Col, Grid, IconButton, Stack, Divider, Dropdown, ColumnProps, TableProps, Panel, Container, Loader, Whisper, Popover, Button } from "rsuite";
import ListMentItem from "./lishMentItem"
import { PaginationWrapper } from "./style"
type LishProps = {
     data: TLishMentState[]
}
const LishList:React.FC<LishProps> = (props) => {
     const {data} = props;
     let count = data.length
     const [loading, setLoading] = React.useState(false);
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);
    const [sortBy, setSortBy] = React.useState('');
    const defaultHList: any[] = [];
    const [hiddenList, setHiddenList] = useState(defaultHList);

    const defaultCheckKeys: any[] = [];
    const [checkedKeys, setCheckedKeys] = React.useState(defaultCheckKeys);
    const sortLimitValues = [10, 20, 30, 50, 100];
    const [sortColumn, setSortColumn] = React.useState();
    const [sortType, setSortType] = React.useState();
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(limit);
    const [sortDir, setSortDir] = useState('DESC');
    useEffect(() => {
     setStart(page*limit - limit)
     setEnd(page*limit)
    }, [page, limit])
    useEffect(() => {
        setLimit(10)
        setPage(1)
       }, [count])


    const compareByName = (obj1:any, obj2:any) => {
          if(obj1.typeContract > obj2.typeContract) return 1
          else if (obj1.typeContract < obj2.typeContract) return -1
          return 0
     }

    let sortData = [...data].sort(compareByName)
    const getData = () => {
     switch(sortBy) {
          case "DESC":
               return sortData.slice(start,end)
          case "ASC":
               return sortData.reverse().slice(start,end)
          default:
          return data.slice(start,end);
     }
    }

     const selectFilter = [{
          id: 1,
          name: "ASC",
     }, {
          id: 2,
          name: "DESC"
     }]
     const getCurrentSortBy = () => {
          const col = selectFilter.find(item => item.name == sortBy)
          if(col) return col.name;
          return "Name"
     }
     // let sortData = data.reverse()
     let lstData = getData()
     console.log("-----------------------lllllllllllll", Math.ceil(count / limit));

     return <div className="form__lst">
            <div className="header__table d-flex justify-content-between border-bottom p-3 border-secondary text-dark">
          <div className="sort__by d-flex align-items-center">
          Sort By
          <Dropdown renderToggle={(props: any, ref: any) => {
                            return (
                                <span {...props} >
                                    {/* <input value={limit} readOnly style={{ width: "32px", "padding": "0px 3px 0px 3px", "border": "solid 1px #ccc" }} /> */}
                                    <span className="ms-3">{getCurrentSortBy()}   <FontAwesomeIcon icon={faAngleDown}/></span>

                                </span>
                            );
                        }} >

                            {

                                selectFilter.map(item => {

                                    return (<Dropdown.Item onClick={() => setSortBy(item.name)}  key={uuidv4()}
                                        style={{ width: 200 , display: "flex", justifyContent: "space-between" }}
                                        className={sortBy == item.name ? "text-green" : ""}
                                    >
                                        {item.name}
                                        {item.name == sortBy? <FontAwesomeIcon icon={faCheck}/>: <></>}
                                    </Dropdown.Item>)

                                })
                            }






                        </Dropdown>
          </div>
          <div className="pagination__by d-flex align-items-center">
          <span className="text-gray d-flex align-items-center me-3">Hi???n th???:</span>
                        <Dropdown renderToggle={(props: any, ref: any) => {
                            return (
                                <span {...props}>
                                    {/* <input value={limit} readOnly style={{ width: "32px", "padding": "0px 3px 0px 3px", "border": "solid 1px #ccc" }} /> */}
                                    <span className=" border" style={{padding: ".2rem", display: "block", borderRadius: "5px"
                                }}><span>{limit}  </span>
                                    <span><FontAwesomeIcon icon={faAngleDown} className="ms-2"/></span>
                                    </span>

                                </span>
                            );
                        }} >

                            {

                                sortLimitValues.map(n => {

                                    return (<Dropdown.Item onClick={() => {
                                        setPage(1);
                                        setLimit(n);

                                    }} key={uuidv4()}
                                        style={{ width: 200 , display: "flex", justifyContent: "space-between" }}
                                        className={limit == n ? "text-green" : ""}
                                    >
                                        {n} {limit == n ? <FontAwesomeIcon icon={faCheck}/>: <></>}
                                    </Dropdown.Item>);

                                })
                            }






                        </Dropdown>
                        <PaginationWrapper className="pagination-wrapper" pages={Math.ceil(count / limit)} page={page}>
                        <Pagination
                            prev
                            next
                            // first
                            // last
                            ellipsis
                            boundaryLinks
                            maxButtons={3}
                            size="xs"
                            //layout={['total', '-', 'limit', '|', 'pager', 'skip']}


                            total={10}
                            pages={Math.ceil(count / limit)}
                            limitOptions={[10, 20, 25, 50, 100]}
                            limit={limit}
                            activePage={page}
                            onChangePage={setPage}
                            onChangeLimit={(val) => { setLimit(val); setPage(1); }}

                        />
                        </PaginationWrapper>
          </div>
          </div>
          <div className="lst__lishment p-3" style={{height: "calc(100vh - 250px)", overflow: "auto"}}>
                         {lstData.length ? lstData.map(item => {
                              return <ListMentItem lishMentItem={item} key={item.id}/>
                         }) : "D??? li???u tr???ng"}
          </div>
     </div>
}
export default LishList