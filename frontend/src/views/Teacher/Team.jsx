import React, { useState, useEffect } from "react";
import { ClassCard } from "../../components/Cards/Card.Class";
import { CreateTeamPopup } from "../../components/popups/team/teacher-create-team";
import { useFetchTeams } from "../../hooks/useTeam";
import { useNavigate } from "react-router-dom";

export const Teacher_TeamSection = () => {
  const teams = useFetchTeams();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const navigate = useNavigate();

  const navigateToTeam = (id) => {
    navigate(`${id}`);
  };

  return (
    <div className='container-md'>
      <div className='container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3'>
        <div className='d-flex flex-row justify-content-between'>
          <h4 className='fw-bold'>Teams</h4>
          <div>
            <button
              className='btn btn-secondary btn-block fw-bold bw-3'
              onClick={handleShowModal}
            >
              Add Team
            </button>
          </div>
          <hr className='text-dark' />
          <div className='row'>
            {Array.isArray(teams) &&
              teams.map((teamItem) => (
                <div key={teamItem.id} className='col-md-3 mb-3'>
                  <ClassCard
                    classData={teamItem}
                    onClick={() => navigateToTeam(teamItem.id)}
                  />
                </div>
              ))}
          </div>
        </div>
        <hr className='text-dark' />
        <CreateTeamPopup show={showModal} handleClose={handleCloseModal} />
      </div>
    </div>
  );
};
