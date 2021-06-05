import React from 'react';
import MaterialTable from 'material-table';
import './App.css';
import CustomExpandLessIcon from './components/customExpandIcon';

function App() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    setUsers([
      {
        id: 1, name: 'Joe Smith', following: [2, 3], interests: [3, 4],
      },
      {
        id: 2, name: 'Jane Doe', following: [1], interests: [1, 2, 4],
      },
      { id: 3, name: 'Reginald Fuzzybottom', following: [2] },
      { id: 4, name: 'Darla Fuzzybottom', following: [1, 3] },
      {
        id: 5, name: 'Frank Pretzel', following: [1, 2, 3], interests: [1, 4],
      },
    ]);
  }, []);
  function getIntrestsByID(id) {
    const userInterests = users.filter((u) => u.id === id)[0].interests;
    return userInterests || [];
  }
  function updateUsers(ExpandedUserId, intresetToRemoveId) {
    setUsers((allUsers) => {
      const user = allUsers.filter((u) => u.id === ExpandedUserId)[0];
      const userOrder = allUsers.indexOf(user);
      const originalInterests = allUsers[userOrder].interests;
      const newInterests = originalInterests.filter(
        (i) => i !== intresetToRemoveId,
      );
      // eslint-disable-next-line no-param-reassign
      allUsers[userOrder].interests = newInterests;
      return allUsers;
    });
  }
  return (
    <div style={{ margin: '20px' }}>
      <MaterialTable
        title="Users"
        data={users.map((user) => ({ name: user.name, count: user.following.length, id: user.id }))}
        columns={[
          // eslint-disable-next-line react/destructuring-assignment
          { title: '', field: 'icon', render: (rowData) => <CustomExpandLessIcon user={rowData} interestsIds={getIntrestsByID(rowData.id)} updateUsers={updateUsers} /> },
          { title: 'Name', field: 'name' },
          { title: 'Followers Count', field: 'count', cellStyle: {} },
          { title: 'ID', field: 'id', hidden: true },
        ]}
        options={{
          sorting: true,
          actionsColumnIndex: -1,
          paging: true,
          pageSize: 10,
          search: false,
        }}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) => {
              setUsers((allUsers) => allUsers.filter((user) => user.id !== rowData.id));
            },
          },
        ]}
      />
    </div>
  );
}
export default App;
