import { Link } from 'react-router-dom';

export default function ManageAdmin() {
  return (
    <div>
      Hello admin
      <Link to='add-admin'>Add Admin</Link>
    </div>
  );
}
