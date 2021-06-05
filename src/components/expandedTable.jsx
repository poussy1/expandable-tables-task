import React from 'react';
import MaterialTable from 'material-table';

function ExpandedTable({
  // eslint-disable-next-line react/prop-types
  setUserInterests, userInterests, expandedUserId, updateUsers, dismissInterestTable,
}) {
  const interestTable = React.useRef();
  const handleClick = (e) => {
    if (interestTable.current.contains(e.target)) {
      return;
    }
    dismissInterestTable();
  };
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
  return (
    <div ref={interestTable}>
      <MaterialTable
        title="Interests"
        style={{ position: 'absolute', padding: '20px' }}
        data={userInterests}
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Interest', field: 'name' },
        ]}
        options={{
          sorting: true,
          actionsColumnIndex: -1,
          paging: false,
          search: false,
        }}
        actions={[{
          icon: 'delete',
          tooltip: 'Delete User',
          onClick: (_event, { id }) => {
            updateUsers(expandedUserId, id);
            setUserInterests((interests) => interests.filter((i) => i.id !== id));
          },
        }]}
      />
    </div>
  );
}
export default ExpandedTable;
