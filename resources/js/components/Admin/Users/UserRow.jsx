import React from "react";
import { Link } from "@inertiajs/react";
import { BASE_URL, STORAGE_URL } from "@/constants/constants";
import { ButtonDelete, ButtonEdit } from "@/components/Admin/Index";

const UserRow = React.memo(({ user, selectedRecords, handleCheckboxChange, handleDelete }) => {
    return (
        <tr key={user.id} className="align-middle">
            <th scope="row" className='col-md-1'>
                <div className="form-check d-flex justify-content-center align-items-center">
                    <input className="form-check-input" type="checkbox" value={user.id}
                        onChange={(e) => handleCheckboxChange(e, user.id)}
                        checked={selectedRecords.includes(user.id)} />
                </div>
            </th>
            <th scope="row" className='col-md-1'>{user.id}</th>
            <td className='col-md-1'>
                <img src={STORAGE_URL + user.profile_img} alt={user.name} title={user.name} className="img-fluid rounded-circle object-fit-cover"
                    style={{ width: '40px', height: '40px', border: '1px solid #ff0000' }} loading="lazy" />
            </td>
            <td className='col-md-2'>{user.name}</td>
            <td className='col-md-2'>{user.email}</td>
            <td className='col-md-1'>{user.role}</td>
            <td className='col-md-1'>{new Date(user.created_at).toLocaleDateString()}</td>
            <td className='col-md-1'>{new Date(user.updated_at).toLocaleDateString()}</td>
            <td className='col-md-2 text-center'>
                <Link href={route('users.edit', user.id)} className="btn">
                    <ButtonEdit url={BASE_URL} />
                </Link>
                <form onSubmit={handleDelete} className='d-inline' id={user.id}>
                    <ButtonDelete url={BASE_URL} />
                </form>
            </td>
        </tr>
    );
});
export default UserRow;