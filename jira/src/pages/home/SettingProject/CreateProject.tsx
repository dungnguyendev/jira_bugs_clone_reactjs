import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik'
import { Editor } from '@tinymce/tinymce-react';
import { createProject, getCategoryPj } from '../../../store/managerProject.service/thunkAction';
import { RootState, useAppDispatch } from '../../../store';
import { useSelector } from 'react-redux';
import { createPj, project } from '../../../services/managerProject.services';
import { checkToken } from '../../../constant/api';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
const CreateProject = () => {
  if (localStorage.getItem("user")) {
    checkToken()
  }
  const AppDisPatch = useAppDispatch()
  const navigate = useNavigate()
  const validationSchema = Yup.object({
    projectName: Yup.string().required('Please enter the new project !'),
    description: Yup.string().required("Please enter the description !"),
    categoryId: Yup.number().moreThan(-1, 'Please select a category !'),
  });
  const formik = useFormik({
    initialValues: {
      projectName: "",
      description: "",
      categoryId: -1,
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      await AppDisPatch(createProject(values))
      navigate("/projectmamagement")
    }
  })
  const AppDispatch = useAppDispatch()
  const { categoryPj } = useSelector((state: RootState) => state.managerProject)
  useEffect(() => {
    AppDispatch(getCategoryPj())
  }, [])
  const [editorContent, setEditorContent] = useState('');

  const handleEditorChange = async (content: string) => {
    await setEditorContent(content)
    formik.setFieldValue("description", content)
  };
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    formik.setFieldValue("categoryId", event.target.value);
  }
  const handlePJName = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("projectName", event.target.value);
  }
  const handleCategory = () => {
    var option = categoryPj?.map((item: project, i) => (
      <option key={i} value={item.id}>{item.projectCategoryName}</option>
    ))

    option?.unshift(
      <option key="0" value="">Select project theme</option>
    )
    return option
  }
  return (
    <div className='main' >
      <div className='box-scroll'>
        <div className="header">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
              <li className="breadcrumb-item">Project</li>
              <li className="breadcrumb-item">Create project </li>
            </ol>
          </nav>
        </div>
        <div className="box" style={{ width: "800px", margin: '0 auto' }}>
          <form className='' onSubmit={formik.handleSubmit}>
            <div className='form-group'>
              <p>Name <FontAwesomeIcon style={{ fontSize: "7px" }} className=' text-red-500' icon={faAsterisk} /> </p>
              <input type="text" style={{ border: "1px solid #ced4da" }} className='form-control rounded-md' onChange={handlePJName} />
              {formik.touched.projectName && formik.errors.projectName && (
                <p className="text-[13px] text-red-500 mt-2">{formik.errors.projectName}</p>
              )}
            </div>
            <div className='form-group'>
              <p>Description <FontAwesomeIcon style={{ fontSize: "7px" }} className=' text-red-500' icon={faAsterisk} /> </p>
              <Editor
                value={editorContent}
                onEditorChange={handleEditorChange}
                onChange={formik.handleChange}
                init={{
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
              {formik.touched.description && formik.errors.description && (
                <p className="text-[13px] text-red-500 mt-2">{formik.errors.description}</p>
              )}
            </div>
            <div className='form-group'>
              <p>Category <FontAwesomeIcon style={{ fontSize: "7px" }} className=' text-red-500' icon={faAsterisk} /> </p>
              <select name="categoryId" className='form-control' onChange={handleOptionChange}>
                {handleCategory()}
              </select>
              {formik.touched.categoryId && formik.errors.categoryId && (
                <p className="text-[13px] text-red-500 mt-2">{formik.errors.categoryId}</p>
              )}
            </div>
            <div className='flex justify-end'>
              <button className="btn btn-outline-primary" type='submit'>Create project</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

};

export default CreateProject;