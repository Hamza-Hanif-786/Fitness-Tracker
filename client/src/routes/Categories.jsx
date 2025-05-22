// // src/routes/Categories.jsx
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/primereact.min.css';

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const [editingRows, setEditingRows] = useState({});

//   // Fetch categories from backend
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get('http://localhost:4000/api/nutrition-categories');
//       setCategories(res.data);
//     } catch (error) {
//       console.error('Fetch error:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Row editor template
//   const textEditor = (options) => {
//     return (
//       <InputText
//         type="text"
//         value={options.value}
//         onChange={(e) => options.editorCallback(e.target.value)}
//         autoFocus
//       />
//     );
//   };

//   // Save row
//   const onRowEditComplete = async (e) => {
//     const { newData } = e;
//     try {
//       const res = await axios.patch(
//         `http://localhost:4000/api/nutrition-categories/${newData._id}`,
//         {
//           categoryname: newData.categoryname,
//         }
//       );
//       console.log('Updated:', res.data);
//       fetchCategories(); // refresh after update
//     } catch (error) {
//       console.error('Update error:', error);
//       alert('Failed to update category');
//     }
//   };

//   return (
//     <div className="card">
//       <h2>Nutrition Categories</h2>
//       <DataTable
//         value={categories}
//         editMode="row"
//         dataKey="_id"
//         onRowEditComplete={onRowEditComplete}
//       >
//         <Column field="categoryname" header="Category Name" editor={textEditor}></Column>
//         <Column rowEditor header="Edit" bodyStyle={{ textAlign: 'center' }}></Column>
//       </DataTable>
//     </div>
//   );
// };

// export default Categories;


import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const toast = useRef(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/nutrition-categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditClick = (category) => {
    setEditId(category._id);
    setEditValue(category.categoryname);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.patch(`http://localhost:4000/api/nutrition-categories/${id}`, {
        categoryname: editValue,
      });
      toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Category updated successfully' });
      setEditId(null);
      fetchCategories(); // refresh
    } catch (error) {
      console.error('Update error:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update category' });
    }
  };

  return (
    <div className="grid p-4">
      <Toast ref={toast} />
      {categories.map((cat) => (
        <div key={cat._id} className="col-12 md:col-4">
          <Card title={`Category ID: ${cat._id}`}>
            {editId === cat._id ? (
              <>
                <InputText
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full mb-2"
                />
                <Button label="Update" icon="pi pi-check" onClick={() => handleUpdate(cat._id)} className="mr-2" />
                <Button label="Cancel" icon="pi pi-times" severity="secondary" onClick={() => setEditId(null)} />
              </>
            ) : (
              <>
                <p>{cat.categoryname}</p>
                <Button label="Edit" icon="pi pi-pencil" onClick={() => handleEditClick(cat)} />
              </>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Categories;
