// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card } from 'primereact/card';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
// import { useRef } from 'react';

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [editValue, setEditValue] = useState('');
//   const toast = useRef(null);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/nutrition-categories');
//       setCategories(response.data);
//     } catch (error) {
//       console.error('Fetch error:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleEditClick = (category) => {
//     setEditId(category._id);
//     setEditValue(category.categoryname);
//   };

//   const handleUpdate = async (id) => {
//     try {
//       await axios.patch(`http://localhost:4000/api/nutrition-categories/${id}`, {
//         categoryname: editValue,
//       });
//       toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Category updated successfully' });
//       setEditId(null);
//       fetchCategories(); // refresh
//     } catch (error) {
//       console.error('Update error:', error);
//       toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update category' });
//     }
//   };

//   return (
//     <div className="grid p-4">
//       <Toast ref={toast} />
//       {categories.map((cat) => (
//         <div key={cat._id} className="col-12 md:col-4">
//           <Card title={`Category ID: ${cat._id}`}>
//             {editId === cat._id ? (
//               <>
//                 <InputText
//                   value={editValue}
//                   onChange={(e) => setEditValue(e.target.value)}
//                   className="w-full mb-2"
//                 />
//                 <Button label="Update" icon="pi pi-check" onClick={() => handleUpdate(cat._id)} className="mr-2" />
//                 <Button label="Cancel" icon="pi pi-times" severity="secondary" onClick={() => setEditId(null)} />
//               </>
//             ) : (
//               <>
//                 <p>{cat.categoryname}</p>
//                 <Button label="Edit" icon="pi pi-pencil" onClick={() => handleEditClick(cat)} />
//               </>
//             )}
//           </Card>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Categories;


import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/nutrition-categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const onRowEditComplete = async (e) => {
    const { newData, index } = e;
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/nutrition-categories/${newData._id}`,
        { categoryname: newData.categoryname }
      );
      toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Category updated successfully' });
      const updatedCategories = [...categories];
      updatedCategories[index] = response.data;
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Update error:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update category' });
    }
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
        autoFocus
      />
    );
  };

  const dt = React.useRef(null);

  return (
    <div className="card p-4">
      <Toast ref={toast} />
      <h2 className="text-xl mb-3 font-semibold">Nutrition Categories</h2>
      <DataTable
        ref={dt}
        value={categories}
        editMode="row"
        dataKey="_id"
        onRowEditComplete={onRowEditComplete}
        className="p-datatable"
      >
        <Column field="categoryname" header="Category Name" editor={textEditor} style={{ width: '80%' }} />
        <Column rowEditor header="Edit" style={{ width: '10%' }} />
      </DataTable>
    </div>
  );
}
