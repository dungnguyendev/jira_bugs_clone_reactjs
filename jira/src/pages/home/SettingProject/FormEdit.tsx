import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useState } from 'react'
import { RootState, useAppDispatch } from '../../../store'
import { DrawerProjectAction } from '../../../store/DrawerJiraBugs/slice'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { project } from '../../../services/managerProject.services'
import { getAllProject, getCategoryPj, updateProjectId } from '../../../store/managerProject.service/thunkAction'
import { checkToken } from '../../../constant/api'
import { useNavigate } from 'react-router-dom'

const FormEdit = () => {
    if (localStorage.getItem("user")) {
        checkToken()
    }
    const navigate = useNavigate()
    const AppDispatch = useAppDispatch()
    const { projecEdit, categoryPj, isLoadingProject } = useSelector((state: RootState) => state.managerProject)
    useEffect(() => {
        AppDispatch(getCategoryPj())
        AppDispatch(DrawerProjectAction.SET_SUBMIT_EDIT({
            submitForm: formik.handleSubmit
        }))


    }, [])


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: Number(projecEdit?.id),
            projectName: String(projecEdit?.projectName),
            description: String(projecEdit?.description),
            categoryId: String(projecEdit?.categoryId)
        },
        onSubmit: async (values) => {
            await AppDispatch(updateProjectId(values))
            await AppDispatch(DrawerProjectAction.CLOSE_DRAWER({}))
            await AppDispatch(getAllProject())
            navigate("/projectmamagement")
        }
    })

    const handleEditorChange = async (content: string) => {

        formik.setFieldValue("description", content)
    };
    const handleCategory = () => {
        return categoryPj?.map((item: project, i) => (
            <option key={i} value={item.id}>{item.projectCategoryName}</option>
        ))
    }
    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        formik.setFieldValue("categoryId", event.target.value);
    }
    const handlePJName = (event: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue("projectName", event.target.value);
    }

    return (
        <div className='container'>
            <form onSubmit={formik.handleSubmit}>
                <div className='row'>
                    <div className='col-4'>
                        <div className='form-group'>
                            <h3 className='mb-2'>Project id</h3>
                            <input type="text" style={{ border: "1px solid #ced4da" }} className='rounded-md form-control' value={projecEdit?.id} name="projecId" disabled />
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='form-group'>
                            <h3 className='mb-2'>Project name</h3>
                            <input type="text"
                                style={{ border: "1px solid #ced4da" }}
                                className='rounded-md form-control'
                                name="projectName"
                                value={formik.values.projectName}
                                onChange={handlePJName} />
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='form-group'>
                            <h3 className='mb-2'>Project category</h3>
                            <select name="categoryId" style={{ border: "1px solid #ced4da" }} className='rounded-md form-control' value={formik.values.categoryId} onChange={handleOptionChange}>
                                {handleCategory()}
                            </select>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className='form-group'>
                            <Editor
                                tagName='description'
                                value={formik.values.description}
                                onEditorChange={handleEditorChange}
                                onChange={formik.handleChange}
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormEdit