/* eslint-disable react/prop-types */
import React from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandedTable from './expandedTable';

function CustomExpandIcon({ user, interestsIds, updateUsers }) {
  const [clicked, setClicked] = React.useState(false);
  const [interests] = React.useState([
    { id: 1, name: 'Skiing' },
    { id: 2, name: 'Basketball' },
    { id: 3, name: 'Football' },
    { id: 4, name: 'Cricket' },
  ], []);
  function handleIconClick() {
    setClicked((iconClicked) => !iconClicked);
  }
  function dismissInterestTable() {
    setClicked(false);
  }

  function getInterstsDetails() {
    return interests.filter((interest) => interestsIds.includes(interest.id));
  }
  const [userInterests, setUserInterests] = React.useState(getInterstsDetails());
  return clicked ? (
    <div>
      <ExpandMoreIcon onClick={() => handleIconClick()} />
      {userInterests.length > 0 ? (
        <ExpandedTable
          userInterests={userInterests}
          setUserInterests={setUserInterests}
          expandedUserId={user.id}
          updateUsers={updateUsers}
          dismissInterestTable={dismissInterestTable}
        />
      ) : (
        ''
      )}
    </div>
  ) : (
    <ExpandLessIcon onClick={handleIconClick} />
  );
}
export default CustomExpandIcon;
