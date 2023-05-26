import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Avatar, InputRef, Popover, Tag, AutoComplete } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';

import { RootState, useAppDispatch } from '../../../store';
import { assignUserProject, deleteProject, getAllProject, removeUserProject } from '../../../store/managerProject.service/thunkAction';
import { addUserProject, listProject } from '../../../services/managerProject.services';
import { useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons'
import { htmlToText } from 'html-to-text'
import { NavLink } from 'react-router-dom';
import { getUserByKeyWord } from '../../../store/managerUser.service/thunkAction';
import { checkToken } from '../../../constant/api';
import { getUserJira } from '../../../services/managerUser.services';
import { DrawerProjectAction } from '../../../store/DrawerJiraBugs/slice';
import FormEdit from './FormEdit';
import { managerProjectAction } from '../../../store/managerProject.service/slice';
import { managerUserAction } from '../../../store/managerUser.service/slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import Highlighter from 'react-highlight-words';
type DataIndex = keyof listProject;
const ProjectManagement: React.FC = () => {
    if (localStorage.getItem("user")) {
        checkToken()
    }
    const { userSearch, user } = useSelector((state: RootState) => state.managerUser)
    const [valueSearch, setValueSearch] = useState('')
    const { listProject } = useSelector((state: RootState) => state.managerProject)
    const AppDispath = useAppDispatch()
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    useEffect(() => {
        AppDispath(getAllProject())
        AppDispath(managerUserAction.getUser({}))
    }, [])
    const filterPj: listProject[] = []
    const handleProjetFilter = () => {
        let bugsObj: any[] = [];
        bugsObj.push(user)
        listProject?.map((item) => {
            bugsObj?.map((item1) => {
                if (item.creator.name === item1.name) {
                    filterPj.push(item)
                }
            })
        })
    }
    handleProjetFilter()
    const data: listProject[] | undefined = listProject
    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<listProject> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search Project Name`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns: ColumnsType<listProject> = [
        {
            title: 'Code',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Project Name',
            key: 'id',
            dataIndex: 'taskName',
            width: '15%',
            ...getColumnSearchProps("projectName"),
            render: (text, record, index) => {
                return <NavLink to={`/projectdetail/${record.id}`}>{record.projectName}</NavLink>
            },
        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'id',
            width: '10%',
        },
        {
            title: 'Creator',
            key: 'id',
            width: '10%',
            render: (text, record, index) => {
                return <Tag color='green'>{record.creator.name}</Tag>

            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'id',
            width: "5%",
            render: (text, record, index) => {
                const plainText = htmlToText(text);
                return <div className='w-full overflow-hidden' key={index}>
                    {plainText}
                </div>;
            }
        },
        {
            title: 'Members',
            key: 'id',
            width: '20%',
            render: (text, record, index) => {
                return <div className='w-full'>
                    {record.members.slice(0, 3).map((item, i: number) => {
                        return <Popover key={i} placement="top" title={"Members"} content={() => {
                            return <table className='table' >
                                <thead>
                                    <tr>
                                        <th>stt</th>
                                        <th>avatar</th>
                                        <th>name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        record.members?.map((item, i) => {
                                            return <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td><img width="30" height="30" style={{ borderRadius: "15px" }} src={item.avatar} alt="" /></td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <button onClick={async () => {
                                                        const userPj: addUserProject = {
                                                            "projectId": record.id,
                                                            "userId": Number(item.userId)
                                                        }
                                                        const flag: boolean = window.confirm(`You sure remove user: ${item.name} ?`)
                                                        if (flag) {
                                                            await AppDispath(removeUserProject(userPj))
                                                            AppDispath(getAllProject())
                                                        }
                                                    }} style={{ outline: "none" }} className='transition  border-none hover:scale-125 text-red-500 font-bold'><CloseOutlined /></button>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        }}>
                            <Avatar className='' style={{ marginRight: "-10px", border: "2px solid #fff" }} key={i} src={item.avatar}></Avatar>
                        </Popover>
                    })}
                    {
                        record.members.length > 3 ? <Avatar className='bg-orange-200 text-red-500 font-bold opacity-80'><span className='text-center pr-3 text-xl'>+1</span></Avatar> : ""
                    }
                    <Popover placement="rightTop" title={"Add user"} content={() => {
                        return <AutoComplete
                            options={userSearch?.map((item: getUserJira, i: number) => {
                                return { label: item.name, value: item.userId.toString() }
                            })}
                            value={valueSearch}

                            onChange={(text) => {
                                setValueSearch(text)

                            }}
                            onSelect={async (valueSelect, option) => {
                                setValueSearch(option.label);
                                const userPj: addUserProject = {
                                    "projectId": record.id,
                                    "userId": Number(valueSelect)
                                }
                                await AppDispath(assignUserProject(userPj))
                                AppDispath(getAllProject())
                            }}
                            style={{ width: "100%" }}
                            onSearch={(value: string) => {
                                { AppDispath(getUserByKeyWord(value)) }
                            }} />
                    }} trigger="click">
                        <Avatar className='ml-2 cursor-pointer bg-orange-300'><span className='pr-2.5'>+</span></Avatar>
                    </Popover>
                </div >
            }
        },
        {
            title: <div className='text-center'>Action</div>,
            key: 'id',
            width: '10%',
            render: (text, record, index) => {
                return <div className='flex justify-center'>
                    <button onClick={async () => {
                        AppDispath(managerProjectAction.EDIT_PROJECT({
                            PJ: record
                        }))
                        AppDispath(DrawerProjectAction.OPEN_EDIT_FORM_DRAWER({
                            content: <FormEdit />,
                            title: "Edit Project"
                        }))

                    }} style={{ outline: "none" }} className='transition m-2 border-none hover:scale-125'><FontAwesomeIcon icon={faPenToSquare} className="text-blue-500 text-base  fa-regular fa-pen-to-square"></FontAwesomeIcon></button>

                    <button style={{ outline: "none" }} className='transition m-2 border-none hover:scale-125'>
                        <FontAwesomeIcon onClick={async () => {
                            if (window.confirm(`You sure remove project name: ${record.projectName} ?`)) {
                                await AppDispath(deleteProject(record.id))
                                AppDispath(getAllProject())
                            }
                        }}
                            icon={faTrashAlt}
                            className="text-red-500 text-base fa-regular fa-trash-can" />

                    </button>
                </div>

            }

        },
    ];
    return <div className='main'>
        <div className="header">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                    <li className="breadcrumb-item">Project</li>
                    <li className="breadcrumb-item">Project management</li>
                </ol>
            </nav>
        </div>
        <Table style={{
            maxWidth: 1200,
        }} columns={columns} rowKey={"id"} dataSource={data} />

    </div>;
};
export default ProjectManagement;